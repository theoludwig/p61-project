import { createClient } from "@supabase/supabase-js"

import type { Database } from "./supabase-types"

const SUPABASE_URL = process.env["EXPO_PUBLIC_SUPABASE_URL"] ?? ""
const SUPABASE_ANON_KEY = process.env["EXPO_PUBLIC_SUPABASE_ANON_KEY"] ?? ""

export const supabaseClient = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
)
