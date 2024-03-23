import { createContext, useContext, useEffect } from "react"

import { usePresenterState } from "@/presentation/react/hooks/usePresenterState"
import type {
  AuthenticationPresenter,
  AuthenticationPresenterState,
} from "@/presentation/presenters/Authentication"
import { authenticationPresenter } from "@/infrastructure/instances"

export interface AuthenticationContextValue
  extends AuthenticationPresenterState {
  authenticationPresenter: AuthenticationPresenter
}

const defaultContextValue = {} as AuthenticationContextValue
const AuthenticationContext =
  createContext<AuthenticationContextValue>(defaultContextValue)

interface AuthenticationProviderProps extends React.PropsWithChildren {}

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = (
  props,
) => {
  const { children } = props

  useEffect(() => {
    authenticationPresenter.initialAuthStateListener().catch((error) => {
      console.error(error)
    })
  }, [])

  const authenticationPresenterState = usePresenterState(
    authenticationPresenter,
  )

  return (
    <AuthenticationContext.Provider
      value={{
        ...authenticationPresenterState,
        authenticationPresenter,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = (): AuthenticationContextValue => {
  const context = useContext(AuthenticationContext)
  if (context === defaultContextValue) {
    throw new Error(
      "`useAuthentication` must be used within a `AuthenticationProvider`.",
    )
  }
  return context
}
