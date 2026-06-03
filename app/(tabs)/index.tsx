import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { Link } from "expo-router";

const MOCK_FLIGHTS = [
  {
    id: "1",
    date: "May 28, 2026",
    route: "JFK → LHR",
    airline: "British Airways",
    aircraft: "Boeing 777-300ER",
    cabin: "Economy",
    score: 4.2,
  },
  {
    id: "2",
    date: "Apr 12, 2026",
    route: "SFO → NRT",
    airline: "ANA",
    aircraft: "Boeing 787-9",
    cabin: "Business",
    score: 4.8,
  },
  {
    id: "3",
    date: "Mar 3, 2026",
    route: "ORD → LAX",
    airline: "United Airlines",
    aircraft: "Airbus A320",
    cabin: "Economy",
    score: 3.1,
  },
];

function FlightCard({ item }: { item: (typeof MOCK_FLIGHTS)[0] }) {
  const scoreColor =
    item.score >= 4.5
      ? "text-emerald-400"
      : item.score >= 3.5
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <Link href={`/flight/${item.id}`} asChild>
      <TouchableOpacity className="bg-night-800 rounded-2xl p-4 mb-3 border border-night-700 active:opacity-70">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-white text-xl font-bold tracking-wide">
              {item.route}
            </Text>
            <Text className="text-sky-400 text-sm mt-0.5">{item.airline}</Text>
            <Text className="text-slate-400 text-xs mt-1">
              {item.aircraft} · {item.cabin} · {item.date}
            </Text>
          </View>
          <View className="items-center justify-center bg-night-700 rounded-xl px-3 py-2 ml-3">
            <Text className={`text-2xl font-bold ${scoreColor}`}>
              {item.score.toFixed(1)}
            </Text>
            <Text className="text-slate-500 text-xs">score</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default function LogbookScreen() {
  return (
    <SafeAreaView className="flex-1 bg-night-900">
      <View className="flex-1 px-4 pt-2">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white text-3xl font-bold">Logbook</Text>
            <Text className="text-slate-400 text-sm mt-0.5">3 flights logged</Text>
          </View>
          <Link href="/log-flight" asChild>
            <TouchableOpacity className="bg-sky-500 rounded-2xl px-4 py-2.5 active:opacity-70">
              <Text className="text-white font-semibold text-sm">+ Log Flight</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <FlatList
          data={MOCK_FLIGHTS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FlightCard item={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
