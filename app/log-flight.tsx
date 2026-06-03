import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

const CABIN_OPTIONS = ["Economy", "Premium Economy", "Business", "First"];

export default function LogFlightScreen() {
  const [cabin, setCabin] = useState("Economy");

  return (
    <SafeAreaView className="flex-1 bg-night-900">
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        <Text className="text-white text-2xl font-bold mb-6">Log a Flight</Text>

        <Text className="text-slate-400 text-xs uppercase tracking-widest mb-2">Route</Text>
        <View className="flex-row gap-3 mb-5">
          <TextInput
            placeholder="From (e.g. JFK)"
            placeholderTextColor="#64748b"
            className="flex-1 bg-night-800 text-white rounded-xl px-4 py-3.5 border border-night-700"
            autoCapitalize="characters"
            maxLength={4}
          />
          <TextInput
            placeholder="To (e.g. LHR)"
            placeholderTextColor="#64748b"
            className="flex-1 bg-night-800 text-white rounded-xl px-4 py-3.5 border border-night-700"
            autoCapitalize="characters"
            maxLength={4}
          />
        </View>

        <Text className="text-slate-400 text-xs uppercase tracking-widest mb-2">Airline</Text>
        <TextInput
          placeholder="e.g. British Airways"
          placeholderTextColor="#64748b"
          className="bg-night-800 text-white rounded-xl px-4 py-3.5 border border-night-700 mb-5"
        />

        <Text className="text-slate-400 text-xs uppercase tracking-widest mb-2">Aircraft</Text>
        <TextInput
          placeholder="e.g. Boeing 777-300ER"
          placeholderTextColor="#64748b"
          className="bg-night-800 text-white rounded-xl px-4 py-3.5 border border-night-700 mb-5"
        />

        <Text className="text-slate-400 text-xs uppercase tracking-widest mb-2">Cabin</Text>
        <View className="flex-row flex-wrap gap-2 mb-5">
          {CABIN_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setCabin(option)}
              className={`px-4 py-2 rounded-xl border ${
                cabin === option
                  ? "bg-sky-500 border-sky-500"
                  : "bg-night-800 border-night-700"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  cabin === option ? "text-white" : "text-slate-400"
                }`}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-slate-400 text-xs uppercase tracking-widest mb-2">Date</Text>
        <TextInput
          placeholder="e.g. May 28, 2026"
          placeholderTextColor="#64748b"
          className="bg-night-800 text-white rounded-xl px-4 py-3.5 border border-night-700 mb-5"
        />

        <Text className="text-slate-400 text-xs uppercase tracking-widest mb-2">
          Rating (0–5)
        </Text>
        <View className="flex-row gap-3 mb-5">
          {["Seat", "Food", "Crew", "IFE"].map((cat) => (
            <View key={cat} className="flex-1 items-center">
              <TextInput
                placeholder="—"
                placeholderTextColor="#64748b"
                keyboardType="decimal-pad"
                maxLength={3}
                className="w-full bg-night-800 text-white rounded-xl px-2 py-3 text-center border border-night-700"
              />
              <Text className="text-slate-500 text-xs mt-1">{cat}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          className="bg-sky-500 rounded-2xl py-4 items-center mt-2 mb-8 active:opacity-70"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold text-base">Save Flight</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
