import type { SupabaseUser } from "@/infrastructure/supabase/supabase"
import { USER_MOCK } from "../domain/User"

interface SupabaseUserMockCreateOptions {
  id?: SupabaseUser["id"]
  email?: SupabaseUser["email"]
  displayName?: SupabaseUser["user_metadata"]["display_name"]
  date?: Date
}
const supabaseUserMockCreate = (
  options: SupabaseUserMockCreateOptions = {},
): SupabaseUser => {
  const {
    id = USER_MOCK.example.id,
    email = USER_MOCK.example.email,
    displayName = USER_MOCK.example.displayName,
    date = new Date(),
  } = options

  return {
    id,
    app_metadata: { provider: "email", providers: ["email"] },
    user_metadata: { display_name: displayName },
    aud: "authenticated",
    email,
    confirmation_sent_at: undefined,
    recovery_sent_at: undefined,
    email_change_sent_at: undefined,
    new_email: "",
    new_phone: "",
    invited_at: undefined,
    action_link: "",
    created_at: date.toISOString(),
    confirmed_at: undefined,
    email_confirmed_at: date.toISOString(),
    phone_confirmed_at: undefined,
    last_sign_in_at: undefined,
    role: "authenticated",
    updated_at: date.toISOString(),
    identities: [
      {
        id,
        user_id: id,
        identity_data: {
          sub: id,
          email,
        },
        provider: "email",
        identity_id: id,
        last_sign_in_at: date.toISOString(),
        created_at: date.toISOString(),
        updated_at: date.toISOString(),
      },
    ],
    is_anonymous: false,
    factors: [],
  }
}

export const SUPABASE_USER_MOCK = {
  create: supabaseUserMockCreate,
  example: supabaseUserMockCreate(),
}
