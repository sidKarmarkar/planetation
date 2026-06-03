import { View, Text, ScrollView, SafeAreaView } from "react-native";

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <View className="bg-night-800 rounded-2xl p-5 flex-1 border border-night-700">
      <Text className="text-slate-400 text-xs uppercase tracking-widest mb-1">{label}</Text>
      <Text className="text-white text-3xl font-bold">{value}</Text>
      {sub && <Text className="text-sky-400 text-xs mt-1">{sub}</Text>}
    </View>
  );
}

export default function StatsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-night-900">
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        <Text className="text-white text-3xl font-bold mb-6">Your Stats</Text>

        <View className="flex-row gap-3 mb-3">
          <StatCard label="Total Flights" value="3" sub="since Jan 2026" />
          <StatCard label="Miles Flown" value="14,230" sub="≈ 0.06× moon" />
        </View>
        <View className="flex-row gap-3 mb-3">
          <StatCard label="Countries" value="4" />
          <StatCard label="Airports" value="7" />
        </View>
        <View className="flex-row gap-3 mb-6">
          <StatCard label="Aircraft Types" value="3" sub="B777, B787, A320" />
          <StatCard label="Avg Score" value="4.0" />
        </View>

        <Text className="text-white text-xl font-semibold mb-3">Airlines Flown</Text>
        {["British Airways", "ANA", "United Airlines"].map((airline) => (
          <View
            key={airline}
            className="flex-row justify-between items-center bg-night-800 rounded-xl px-4 py-3 mb-2 border border-night-700"
          >
            <Text className="text-white">{airline}</Text>
            <Text className="text-slate-400 text-sm">1 flight</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
