import "../global.css";
import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

/**
 * Watches auth state and redirects accordingly.
 * Sits inside AuthProvider so it has access to session.
 */
function RootLayoutNav() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      // Not signed in — send to sign in
      router.replace("/(auth)/sign-in");
    } else if (session && inAuthGroup) {
      // Signed in — send to app
      router.replace("/(tabs)");
    }
  }, [session, loading, segments]);

  // Blank loading screen while we check for an existing session.
  // Keeps the splash screen from flashing the wrong route.
  if (loading) {
    return (
      <View className="flex-1 bg-night-900 items-center justify-center">
        <ActivityIndicator color="#38bdf8" size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0F172A" },
        headerTintColor: "#f8fafc",
        headerTitleStyle: { fontWeight: "600" },
        contentStyle: { backgroundColor: "#0F172A" },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen
        name="log-flight"
        options={{ title: "Log a Flight", presentation: "modal" }}
      />
      <Stack.Screen
        name="flight/[id]"
        options={{ title: "Flight Details" }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </>
  );
}
