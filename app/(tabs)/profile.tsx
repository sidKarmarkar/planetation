import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-night-900">
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-sky-500 items-center justify-center mb-3">
            <Text className="text-white text-3xl font-bold">S</Text>
          </View>
          <Text className="text-white text-2xl font-bold">Sid K</Text>
          <Text className="text-slate-400 text-sm mt-1">Member since June 2026</Text>
          <View className="flex-row gap-6 mt-4">
            <View className="items-center">
              <Text className="text-white text-xl font-bold">3</Text>
              <Text className="text-slate-400 text-xs">Flights</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-xl font-bold">4</Text>
              <Text className="text-slate-400 text-xs">Countries</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-xl font-bold">3</Text>
              <Text className="text-slate-400 text-xs">Aircraft</Text>
            </View>
          </View>
        </View>

        <Text className="text-slate-400 text-xs uppercase tracking-widest mb-3">Account</Text>
        {["Edit Profile", "Notification Settings", "Privacy"].map((item) => (
          <TouchableOpacity
            key={item}
            className="flex-row justify-between items-center bg-night-800 rounded-xl px-4 py-4 mb-2 border border-night-700 active:opacity-70"
          >
            <Text className="text-white">{item}</Text>
            <Text className="text-slate-500">›</Text>
          </TouchableOpacity>
        ))}

        <Text className="text-slate-400 text-xs uppercase tracking-widest mt-4 mb-3">Coming Soon</Text>
        {["Frequent Flyer Programs", "Points & Miles Tracker", "Flight Booking"].map((item) => (
          <View
            key={item}
            className="flex-row justify-between items-center bg-night-800 rounded-xl px-4 py-4 mb-2 border border-night-700 opacity-50"
          >
            <Text className="text-slate-400">{item}</Text>
            <Text className="text-sky-500 text-xs">Soon</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
