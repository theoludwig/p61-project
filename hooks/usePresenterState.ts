import { useEffect, useState } from "react"

import type { Presenter } from "@/data/infrastructure/presenters/_Presenter"

export const usePresenterState = <S>(presenter: Presenter<S>): S => {
  const [state, setState] = useState<S>(presenter.initialState)

  useEffect(() => {
    const presenterSubscription = (state: S): void => {
      setState(state)
    }

    presenter.subscribe(presenterSubscription)

    return () => {
      return presenter.unsubscribe(presenterSubscription)
    }
  }, [presenter])

  return state
}
