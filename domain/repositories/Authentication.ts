import type { User, UserLoginData, UserRegisterData } from "../entities/User"

export interface AuthenticationRepository {
  register: (data: UserRegisterData) => Promise<User>
  login: (data: UserLoginData) => Promise<User>
  logout: () => Promise<void>

  getUser: () => Promise<User | null>
  onUserStateChange: (
    callback: (user: User | null) => void | Promise<void>,
  ) => void
}
