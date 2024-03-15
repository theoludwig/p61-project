import { useState } from "react"

export interface UseBooleanResult {
  value: boolean
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
}

export interface UseBooleanOptions {
  /**
   * The initial value of the boolean.
   * @default false
   */
  initialValue?: boolean
}

/**
 * Hook to manage a boolean state.
 * @param options
 * @returns
 */
export const useBoolean = (
  options: UseBooleanOptions = {},
): UseBooleanResult => {
  const { initialValue = false } = options

  const [value, setValue] = useState(initialValue)

  const toggle = (): void => {
    setValue((old) => {
      return !old
    })
  }

  const setTrue = (): void => {
    setValue(true)
  }

  const setFalse = (): void => {
    setValue(false)
  }

  return {
    value,
    toggle,
    setTrue,
    setFalse,
  }
}
