import { produce } from "immer"

type Listener<State> = (state: State) => void

type SetStateAction<State> = (state: State) => void

export const FETCH_STATES = ["idle", "loading", "error", "success"] as const
export type FetchState = (typeof FETCH_STATES)[number]

export type ErrorGlobal = "unknown" | null

export abstract class Presenter<State> {
  private _state: State
  private readonly _initialState: State
  private readonly _listeners: Array<Listener<State>>

  public constructor(initialState: State) {
    this._state = initialState
    this._initialState = initialState
    this._listeners = []
  }

  public get initialState(): State {
    return this._initialState
  }

  /**
   * @description Set the state of the presenter.
   * @param action A function that receives the current state and can update it by mutating it.
   * @returns The new state.
   */
  public setState(action: SetStateAction<State>): State {
    this._state = produce(this._state, action)
    this.notifyListeners()
    return this._state
  }

  public subscribe(listener: Listener<State>): void {
    this._listeners.push(listener)
  }

  public unsubscribe(listener: Listener<State>): void {
    const listenerIndex = this._listeners.indexOf(listener)
    this._listeners.splice(listenerIndex, 1)
  }

  private notifyListeners(): void {
    for (const listener of this._listeners) {
      listener(this._state)
    }
  }
}
