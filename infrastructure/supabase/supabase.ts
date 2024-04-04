import { createClient } from "@supabase/supabase-js"
import { AppState, Platform } from "react-native"
import "react-native-url-polyfill/auto"
import AsyncStorage from "@react-native-async-storage/async-storage"

import type { Database } from "./supabase-types"

const SUPABASE_URL =
  process.env["EXPO_PUBLIC_SUPABASE_URL"] ??
  "https://wjtwtzxreersqfvfgxrz.supabase.co"
const SUPABASE_ANON_KEY =
  process.env["EXPO_PUBLIC_SUPABASE_ANON_KEY"] ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqdHd0enhyZWVyc3FmdmZneHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExNDcyNzAsImV4cCI6MjAyNjcyMzI3MH0.AglONhsMvmcCRkqwrZsB4Ws9u3o1FAbLlpKJmqeUv8I"

export const supabaseClient = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      // https://github.com/supabase/supabase-js/issues/870
      ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
)

/**
 * Tells Supabase Auth to continuously refresh the session automatically if the app is in the foreground.
 * When this is added, you will continue to receive `onAuthStateChange` events with the `TOKEN_REFRESH` or `SIGNED_OUT` event if the user's session is terminated.
 * This should only be registered once.
 */
AppState.addEventListener("change", async (state) => {
  if (state === "active") {
    await supabaseClient.auth.startAutoRefresh()
  } else {
    await supabaseClient.auth.stopAutoRefresh()
  }
})
