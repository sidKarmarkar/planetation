-- ============================================================
-- Planetation — Initial Schema
-- ============================================================

-- Profiles (extends Supabase auth.users)
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  username     text unique not null,
  display_name text not null,
  avatar_url   text,
  created_at   timestamptz default now() not null
);
alter table public.profiles enable row level security;

create policy "Users can read any profile"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- Flights
-- ============================================================
create table public.flights (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  origin       char(3) not null,
  destination  char(3) not null,
  airline      text not null,
  aircraft     text not null,
  cabin        text not null check (cabin in ('Economy','Premium Economy','Business','First')),
  flight_date  date not null,
  score_seat   numeric(3,1) check (score_seat between 0 and 5),
  score_food   numeric(3,1) check (score_food between 0 and 5),
  score_crew   numeric(3,1) check (score_crew between 0 and 5),
  score_ife    numeric(3,1) check (score_ife between 0 and 5),
  notes        text,
  created_at   timestamptz default now() not null
);
alter table public.flights enable row level security;

create policy "Users can read own flights"
  on public.flights for select using (auth.uid() = user_id);

create policy "Users can insert own flights"
  on public.flights for insert with check (auth.uid() = user_id);

create policy "Users can update own flights"
  on public.flights for update using (auth.uid() = user_id);

create policy "Users can delete own flights"
  on public.flights for delete using (auth.uid() = user_id);

-- Computed overall score as a postgres function
create or replace function public.flight_score(f public.flights)
returns numeric language sql stable as $$
  select round(
    (coalesce(f.score_seat, 0) + coalesce(f.score_food, 0) +
     coalesce(f.score_crew, 0) + coalesce(f.score_ife, 0)) /
    nullif(
      (case when f.score_seat is not null then 1 else 0 end +
       case when f.score_food is not null then 1 else 0 end +
       case when f.score_crew is not null then 1 else 0 end +
       case when f.score_ife  is not null then 1 else 0 end), 0
    )
  , 1);
$$;

create index flights_user_id_idx on public.flights(user_id);
create index flights_flight_date_idx on public.flights(flight_date desc);
