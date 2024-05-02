import { createContext, useContext, useEffect } from "react"

import { habitsTrackerPresenter } from "@/infrastructure/instances"
import type {
  HabitsTrackerPresenter,
  HabitsTrackerPresenterState,
} from "@/presentation/presenters/HabitsTracker"
import { usePresenterState } from "@/presentation/react/hooks/usePresenterState"
import { useAuthentication } from "./Authentication"

export interface HabitsTrackerContextValue extends HabitsTrackerPresenterState {
  habitsTrackerPresenter: HabitsTrackerPresenter
}

const defaultContextValue = {} as HabitsTrackerContextValue
const HabitsTrackerContext =
  createContext<HabitsTrackerContextValue>(defaultContextValue)

interface HabitsTrackerProviderProps extends React.PropsWithChildren {}

export const HabitsTrackerProvider: React.FC<HabitsTrackerProviderProps> = (
  props,
) => {
  const { children } = props

  const { user } = useAuthentication()

  useEffect(() => {
    if (user == null) {
      return
    }
    habitsTrackerPresenter
      .retrieveHabitsTracker({ userId: user.id })
      .catch((error) => {
        console.error(error)
      })
  }, [user])

  const habitsTrackerPresenterState = usePresenterState(habitsTrackerPresenter)

  return (
    <HabitsTrackerContext.Provider
      value={{
        ...habitsTrackerPresenterState,
        habitsTrackerPresenter,
      }}
    >
      {children}
    </HabitsTrackerContext.Provider>
  )
}

export const useHabitsTracker = (): HabitsTrackerContextValue => {
  const context = useContext(HabitsTrackerContext)
  if (context === defaultContextValue) {
    throw new Error(
      "`useHabitsTracker` must be used within a `HabitsTrackerProvider`.",
    )
  }
  return context
}
