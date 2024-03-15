import { produce } from "immer"

type Listener<S> = (state: S) => void

type SetStateAction<S> = (state: S) => void

export abstract class Presenter<S> {
  private _state: S
  private readonly _initialState: S
  private readonly _listeners: Array<Listener<S>>

  public constructor(initialState: S) {
    this._state = initialState
    this._initialState = initialState
    this._listeners = []
  }

  public get initialState(): S {
    return this._initialState
  }

  /**
   * @description Set the state of the presenter.
   * @param action A function that receives the current state and can update it by mutating it.
   * @returns The new state.
   */
  public setState(action: SetStateAction<S>): S {
    this._state = produce(this._state, action)
    this.notifyListeners()
    return this._state
  }

  public subscribe(listener: Listener<S>): void {
    this._listeners.push(listener)
  }

  public unsubscribe(listener: Listener<S>): void {
    const listenerIndex = this._listeners.indexOf(listener)
    const listenerFound = listenerIndex !== -1
    if (listenerFound) {
      this._listeners.splice(listenerIndex, 1)
    }
  }

  private notifyListeners(): void {
    for (const listener of this._listeners) {
      listener(this._state)
    }
  }
}
