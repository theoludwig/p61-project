import { ZodError } from "zod"

import type {
  User,
  UserLoginData,
  UserRegisterData,
} from "@/domain/entities/User"
import type { AuthenticationUseCase } from "@/domain/use-cases/Authentication"
import type { ErrorGlobal, FetchState } from "./_Presenter"
import { Presenter } from "./_Presenter"
import { zodPresenter } from "./utils/ZodPresenter"

export interface AuthenticationPresenterState {
  user: User | null

  /**
   * `true` if the initial authentication state has been loaded.
   */
  hasLoaded: boolean

  register: {
    state: FetchState
    errorsFields: Array<keyof UserRegisterData>
    errorGlobal: ErrorGlobal
  }

  login: {
    state: FetchState
    errorsFields: Array<keyof UserLoginData>
    errorGlobal: ErrorGlobal
  }

  logout: {
    state: FetchState
  }
}

export interface AuthenticationPresenterOptions {
  authenticationUseCase: AuthenticationUseCase
}

export class AuthenticationPresenter
  extends Presenter<AuthenticationPresenterState>
  implements AuthenticationPresenterOptions
{
  public authenticationUseCase: AuthenticationUseCase

  public constructor(options: AuthenticationPresenterOptions) {
    const { authenticationUseCase } = options
    super({
      user: null,
      hasLoaded: true,
      register: {
        state: "idle",
        errorsFields: [],
        errorGlobal: null,
      },
      login: {
        state: "idle",
        errorsFields: [],
        errorGlobal: null,
      },
      logout: {
        state: "idle",
      },
    })
    this.authenticationUseCase = authenticationUseCase
  }

  public async register(data: unknown): Promise<void> {
    try {
      this.setState((state) => {
        state.register.state = "loading"
        state.register.errorsFields = []
        state.register.errorGlobal = null
      })
      const user = await this.authenticationUseCase.register(data)
      this.setState((state) => {
        state.register.state = "success"
        state.user = user
      })
    } catch (error) {
      this.setState((state) => {
        state.register.state = "error"
        if (error instanceof ZodError) {
          state.register.errorsFields =
            zodPresenter.getErrorsFieldsFromZodError<UserRegisterData>(error)
        } else {
          state.register.errorGlobal = "unknown"
        }
      })
    }
  }

  public async login(data: unknown): Promise<void> {
    try {
      this.setState((state) => {
        state.login.state = "loading"
        state.login.errorsFields = []
        state.login.errorGlobal = null
      })
      const user = await this.authenticationUseCase.login(data)
      this.setState((state) => {
        state.login.state = "success"
        state.user = user
      })
    } catch (error) {
      this.setState((state) => {
        state.login.state = "error"
        if (error instanceof ZodError) {
          state.login.errorsFields =
            zodPresenter.getErrorsFieldsFromZodError<UserLoginData>(error)
        } else {
          state.login.errorGlobal = "unknown"
        }
      })
    }
  }

  public async logout(): Promise<void> {
    try {
      this.setState((state) => {
        state.logout.state = "loading"
      })
      await this.authenticationUseCase.logout()
      this.setState((state) => {
        state.logout.state = "success"
        state.user = null
      })
    } catch (error) {
      this.setState((state) => {
        state.user = null
        state.logout.state = "error"
      })
    }
  }

  public async initialAuthStateListener(): Promise<void> {
    const user = await this.authenticationUseCase.getUser()
    this.setState((state) => {
      state.user = user
      state.hasLoaded = false
    })

    this.authenticationUseCase.onUserStateChange((user) => {
      this.setState((state) => {
        state.user = user
      })
    })
  }
}
