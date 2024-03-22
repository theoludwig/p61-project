import {
  UserRegisterSchema,
  type User,
  UserLoginSchema,
} from "../entities/User"
import type { AuthenticationRepository } from "../repositories/Authentication"

export interface AuthenticationUseCaseDependencyOptions {
  authenticationRepository: AuthenticationRepository
}

export class AuthenticationUseCase
  implements AuthenticationUseCaseDependencyOptions
{
  public authenticationRepository: AuthenticationRepository

  public constructor(options: AuthenticationUseCaseDependencyOptions) {
    this.authenticationRepository = options.authenticationRepository
  }

  /**
   * Register a new user.
   * @throws {ZodError} if the data is invalid.
   * @throws {Error} if user already exists.
   * @param data
   * @returns
   */
  public async register(data: unknown): Promise<User> {
    const userData = await UserRegisterSchema.parseAsync(data)
    return await this.authenticationRepository.register(userData)
  }

  /**
   * Login a user.
   * @throws {ZodError} if the data is invalid.
   * @throws {Error} if invalid credentials.
   * @param data
   * @returns
   */
  public async login(data: unknown): Promise<User> {
    const userData = await UserLoginSchema.parseAsync(data)
    return await this.authenticationRepository.login(userData)
  }

  public async logout(): Promise<void> {
    return await this.authenticationRepository.logout()
  }

  public getUser: AuthenticationRepository["getUser"] = async (...args) => {
    return await this.authenticationRepository.getUser(...args)
  }

  public onUserStateChange: AuthenticationRepository["onUserStateChange"] =
    async (...args) => {
      return this.authenticationRepository.onUserStateChange(...args)
    }
}
