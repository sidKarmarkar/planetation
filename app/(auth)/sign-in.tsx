import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function SignInScreen() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    const { error } = await signIn(email.trim().toLowerCase(), password);
    setLoading(false);

    if (error) setError(error.message);
    // On success, useAuth updates session → root layout redirects to tabs
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-night-900"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Logo / wordmark */}
          <View className="items-center mb-12">
            <Text className="text-sky-400 text-5xl">✈️</Text>
            <Text className="text-white text-4xl font-bold mt-3 tracking-tight">
              Planetation
            </Text>
            <Text className="text-slate-400 text-sm mt-1">
              Your aviation logbook
            </Text>
          </View>

          {/* Form */}
          <View className="gap-3">
            <View>
              <Text className="text-slate-400 text-xs uppercase tracking-widest mb-1.5">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#475569"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                className="bg-night-800 text-white rounded-xl px-4 py-4 border border-night-700 text-base"
              />
            </View>

            <View>
              <Text className="text-slate-400 text-xs uppercase tracking-widest mb-1.5">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#475569"
                secureTextEntry
                autoComplete="current-password"
                className="bg-night-800 text-white rounded-xl px-4 py-4 border border-night-700 text-base"
              />
            </View>

            {/* Error message */}
            {error && (
              <View className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                <Text className="text-red-400 text-sm">{error}</Text>
              </View>
            )}

            <TouchableOpacity
              onPress={handleSignIn}
              disabled={loading}
              className="bg-sky-500 rounded-2xl py-4 items-center mt-2 active:opacity-70 disabled:opacity-50"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold text-base">Sign In</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="flex-row justify-center mt-8 gap-1">
            <Text className="text-slate-400">Don't have an account?</Text>
            <Link href="/(auth)/sign-up" asChild>
              <TouchableOpacity>
                <Text className="text-sky-400 font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
