import { View, Text, ScrollView, SafeAreaView } from "react-native";

const AIRLINE_RANKINGS = [
  { rank: 1, name: "ANA", score: 4.8, tag: "Best Overall" },
  { rank: 2, name: "British Airways", score: 4.2, tag: null },
  { rank: 3, name: "United Airlines", score: 3.1, tag: null },
];

const AIRCRAFT_RANKINGS = [
  { rank: 1, name: "Boeing 787-9", score: 4.8, tag: "Smoothest Ride" },
  { rank: 2, name: "Boeing 777-300ER", score: 4.2, tag: null },
  { rank: 3, name: "Airbus A320", score: 3.1, tag: null },
];

function RankingRow({
  rank,
  name,
  score,
  tag,
}: {
  rank: number;
  name: string;
  score: number;
  tag: string | null;
}) {
  const medalColor =
    rank === 1 ? "text-yellow-400" : rank === 2 ? "text-slate-300" : "text-amber-600";
  const scoreColor =
    score >= 4.5 ? "text-emerald-400" : score >= 3.5 ? "text-yellow-400" : "text-red-400";

  return (
    <View className="flex-row items-center bg-night-800 rounded-xl px-4 py-3.5 mb-2 border border-night-700">
      <Text className={`text-xl font-bold w-8 ${medalColor}`}>
        {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
      </Text>
      <View className="flex-1 ml-2">
        <Text className="text-white font-semibold">{name}</Text>
        {tag && <Text className="text-sky-400 text-xs mt-0.5">{tag}</Text>}
      </View>
      <Text className={`text-lg font-bold ${scoreColor}`}>{score.toFixed(1)}</Text>
    </View>
  );
}

export default function RankingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-night-900">
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        <Text className="text-white text-3xl font-bold mb-2">Your Rankings</Text>
        <Text className="text-slate-400 text-sm mb-6">
          Personalized based on your flights
        </Text>

        <Text className="text-white text-xl font-semibold mb-3">✈️  Airlines</Text>
        {AIRLINE_RANKINGS.map((item) => (
          <RankingRow key={item.name} {...item} />
        ))}

        <Text className="text-white text-xl font-semibold mt-6 mb-3">🛩️  Aircraft</Text>
        {AIRCRAFT_RANKINGS.map((item) => (
          <RankingRow key={item.name} {...item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
