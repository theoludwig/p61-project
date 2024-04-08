import { useEffect, useState } from "react"

import type { Presenter } from "@/presentation/presenters/_Presenter"

export const usePresenterState = <State>(
  presenter: Presenter<State>,
): State => {
  const [state, setState] = useState<State>(presenter.initialState)

  useEffect(() => {
    const presenterSubscription = (state: State): void => {
      setState(state)
    }

    presenter.subscribe(presenterSubscription)

    return () => {
      return presenter.unsubscribe(presenterSubscription)
    }
  }, [presenter])

  return state
}
