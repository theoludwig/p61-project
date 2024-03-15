import type { SupabaseClient } from "@supabase/supabase-js"

import type { Database } from "../supabase-types"

export interface SupabaseRepositoryOptions {
  supabaseClient: SupabaseClient<Database>
}

export abstract class SupabaseRepository implements SupabaseRepositoryOptions {
  public supabaseClient: SupabaseRepositoryOptions["supabaseClient"]

  public constructor(options: SupabaseRepositoryOptions) {
    this.supabaseClient = options.supabaseClient
  }
}
