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

export default function SignUpScreen() {
  const { signUp } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleSignUp = async () => {
    setError(null);

    if (!displayName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const { error, needsConfirmation } = await signUp(
      email.trim().toLowerCase(),
      password,
      displayName.trim()
    );
    setLoading(false);

    if (error) {
      setError(error.message);
    } else if (needsConfirmation) {
      // Email confirmation required — show confirmation message
      setConfirmed(true);
    }
    // If no confirmation needed, useAuth session update → root layout redirects
  };

  // After sign-up with email confirmation required
  if (confirmed) {
    return (
      <View className="flex-1 bg-night-900 items-center justify-center px-6">
        <Text className="text-sky-400 text-5xl mb-6">📬</Text>
        <Text className="text-white text-2xl font-bold text-center mb-3">
          Check your email
        </Text>
        <Text className="text-slate-400 text-base text-center leading-6 mb-8">
          We sent a confirmation link to{" "}
          <Text className="text-white">{email}</Text>. Open it to activate your
          account, then come back to sign in.
        </Text>
        <Link href="/(auth)/sign-in" asChild>
          <TouchableOpacity className="bg-sky-500 rounded-2xl px-8 py-4 active:opacity-70">
            <Text className="text-white font-bold text-base">Go to Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  }

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
          {/* Header */}
          <View className="items-center mb-10">
            <Text className="text-sky-400 text-5xl">✈️</Text>
            <Text className="text-white text-3xl font-bold mt-3 tracking-tight">
              Create account
            </Text>
            <Text className="text-slate-400 text-sm mt-1">
              Start your aviation logbook
            </Text>
          </View>

          {/* Form */}
          <View className="gap-3">
            <View>
              <Text className="text-slate-400 text-xs uppercase tracking-widest mb-1.5">
                Your Name
              </Text>
              <TextInput
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="e.g. Sid K"
                placeholderTextColor="#475569"
                autoCapitalize="words"
                autoCorrect={false}
                autoComplete="name"
                className="bg-night-800 text-white rounded-xl px-4 py-4 border border-night-700 text-base"
              />
            </View>

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
                placeholder="Min. 8 characters"
                placeholderTextColor="#475569"
                secureTextEntry
                autoComplete="new-password"
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
              onPress={handleSignUp}
              disabled={loading}
              className="bg-sky-500 rounded-2xl py-4 items-center mt-2 active:opacity-70 disabled:opacity-50"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold text-base">
                  Create Account
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="flex-row justify-center mt-8 gap-1">
            <Text className="text-slate-400">Already have an account?</Text>
            <Link href="/(auth)/sign-in" asChild>
              <TouchableOpacity>
                <Text className="text-sky-400 font-semibold">Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
