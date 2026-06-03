import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";

const MOCK_FLIGHTS: Record<string, {
  route: string; airline: string; aircraft: string;
  cabin: string; date: string; scores: Record<string, number>;
}> = {
  "1": {
    route: "JFK → LHR", airline: "British Airways", aircraft: "Boeing 777-300ER",
    cabin: "Economy", date: "May 28, 2026",
    scores: { Seat: 4.0, Food: 3.5, Crew: 4.5, IFE: 4.8 },
  },
  "2": {
    route: "SFO → NRT", airline: "ANA", aircraft: "Boeing 787-9",
    cabin: "Business", date: "Apr 12, 2026",
    scores: { Seat: 5.0, Food: 4.8, Crew: 5.0, IFE: 4.5 },
  },
  "3": {
    route: "ORD → LAX", airline: "United Airlines", aircraft: "Airbus A320",
    cabin: "Economy", date: "Mar 3, 2026",
    scores: { Seat: 2.5, Food: 2.0, Crew: 3.5, IFE: 4.5 },
  },
};

export default function FlightDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const flight = MOCK_FLIGHTS[id];

  if (!flight) {
    return (
      <SafeAreaView className="flex-1 bg-night-900 items-center justify-center">
        <Text className="text-white">Flight not found</Text>
      </SafeAreaView>
    );
  }

  const avgScore =
    Object.values(flight.scores).reduce((a, b) => a + b, 0) /
    Object.values(flight.scores).length;
  const scoreColor =
    avgScore >= 4.5 ? "text-emerald-400" : avgScore >= 3.5 ? "text-yellow-400" : "text-red-400";

  return (
    <SafeAreaView className="flex-1 bg-night-900">
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        <Text className="text-white text-3xl font-bold">{flight.route}</Text>
        <Text className="text-sky-400 text-base mt-1">{flight.airline}</Text>
        <Text className="text-slate-400 text-sm mt-1">
          {flight.aircraft} · {flight.cabin} · {flight.date}
        </Text>

        <View className="items-center my-8">
          <Text className={`text-7xl font-bold ${scoreColor}`}>
            {avgScore.toFixed(1)}
          </Text>
          <Text className="text-slate-400 mt-1">Overall Score</Text>
        </View>

        <Text className="text-white text-xl font-semibold mb-3">Breakdown</Text>
        {Object.entries(flight.scores).map(([category, score]) => (
          <View
            key={category}
            className="flex-row justify-between items-center bg-night-800 rounded-xl px-4 py-3.5 mb-2 border border-night-700"
          >
            <Text className="text-white">{category}</Text>
            <View className="flex-row items-center gap-2">
              <View className="w-32 h-2 bg-night-700 rounded-full overflow-hidden">
                <View
                  className="h-full bg-sky-500 rounded-full"
                  style={{ width: `${(score / 5) * 100}%` }}
                />
              </View>
              <Text className="text-white font-semibold w-8 text-right">
                {score.toFixed(1)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
