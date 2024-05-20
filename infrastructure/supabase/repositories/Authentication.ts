import type { Session } from "@supabase/supabase-js"

import { User } from "@/domain/entities/User"
import type { AuthenticationRepository } from "@/domain/repositories/Authentication"
import { SupabaseRepository } from "@/infrastructure/supabase/repositories/_SupabaseRepository"

export class AuthenticationSupabaseRepository
  extends SupabaseRepository
  implements AuthenticationRepository
{
  private readonly getUserFromSession = (session: Session | null): User => {
    if (session == null || session?.user?.email == null) {
      throw new Error("Session is null.")
    }
    const user = new User({
      id: session.user.id,
      displayName: session.user.user_metadata["display_name"],
      email: session.user.email,
    })
    return user
  }

  public register: AuthenticationRepository["register"] = async (data) => {
    const { displayName, email, password } = data
    const {
      data: { session },
      error,
    } = await this.supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    })
    if (error != null) {
      throw new Error(error.message)
    }
    const user = this.getUserFromSession(session)
    return user
  }

  public login: AuthenticationRepository["login"] = async (data) => {
    const { email, password } = data
    const {
      data: { session },
      error,
    } = await this.supabaseClient.auth.signInWithPassword({
      email,
      password,
    })
    if (error != null) {
      throw new Error(error.message)
    }
    const user = this.getUserFromSession(session)
    return user
  }

  public logout: AuthenticationRepository["logout"] = async () => {
    await this.supabaseClient.auth.signOut()
  }

  public getUser: AuthenticationRepository["getUser"] = async () => {
    try {
      const {
        data: { session },
      } = await this.supabaseClient.auth.getSession()
      const user = this.getUserFromSession(session)
      return user
    } catch {
      return null
    }
  }

  public onUserStateChange: AuthenticationRepository["onUserStateChange"] = (
    callback,
  ) => {
    this.supabaseClient.auth.onAuthStateChange(async (_, session) => {
      try {
        const user = this.getUserFromSession(session)
        await callback(user)
      } catch {
        await callback(null)
      }
    })
  }
}
