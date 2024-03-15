import { createContext, useContext, useEffect } from "react"

import type {
  HabitsTrackerPresenter,
  HabitsTrackerPresenterState,
} from "@/data/infrastructure/presenters/HabitsTrackerPresenter"
import { usePresenterState } from "@/hooks/usePresenterState"
import { habitsTrackerPresenter } from "@/data/infrastructure"

export interface HabitsTrackerContextValue {
  habitsTrackerPresenterState: HabitsTrackerPresenterState
  habitsTrackerPresenter: HabitsTrackerPresenter
}

const defaultHabitsTrackerContextValue = {} as HabitsTrackerContextValue
const HabitsTrackerContext = createContext<HabitsTrackerContextValue>(
  defaultHabitsTrackerContextValue,
)

interface HabitsTrackerProviderProps extends React.PropsWithChildren {}

export const HabitsTrackerProvider: React.FC<HabitsTrackerProviderProps> = (
  props,
) => {
  const { children } = props

  useEffect(() => {
    habitsTrackerPresenter
      .retrieveHabitsTracker({ userId: "1" })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const habitsTrackerPresenterState = usePresenterState(habitsTrackerPresenter)

  return (
    <HabitsTrackerContext.Provider
      value={{ habitsTrackerPresenterState, habitsTrackerPresenter }}
    >
      {children}
    </HabitsTrackerContext.Provider>
  )
}

export const useHabitsTracker = (): HabitsTrackerContextValue => {
  const context = useContext(HabitsTrackerContext)
  if (context === defaultHabitsTrackerContextValue) {
    throw new Error(
      "`useHabitsTracker` must be used within a `HabitsTrackerProvider`.",
    )
  }
  return context
}
