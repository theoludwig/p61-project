import { act, renderHook, waitFor } from "@testing-library/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { useLocalStorage } from "@/hooks/useLocalStorage"

describe("hooks/useLocalStorage", () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    await AsyncStorage.clear()
  })

  it("should get the default value", () => {
    const key = "key"
    const givenDefaultValue = { key: "value" }
    const { result } = renderHook(() => {
      return useLocalStorage(key, givenDefaultValue)
    })
    const [actualValue] = result.current
    expect(actualValue).toEqual(givenDefaultValue)
  })

  it("should get the value from the storage", async () => {
    const key = "key"
    const givenDefaultValue = { someValue: "value" }
    const storedValue = { someValue: "value" }
    const { result } = renderHook(() => {
      return useLocalStorage(key, givenDefaultValue)
    })
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(key)
    })
    const [actualValue] = result.current
    expect(actualValue).toEqual(storedValue)
  })

  it("should set the value to the storage", async () => {
    const key = "key"
    const givenDefaultValue = { someValue: "value" }
    const storedValue = { someValue: "value" }
    const { result } = renderHook(() => {
      return useLocalStorage(key, givenDefaultValue)
    })
    const [, setValue] = result.current
    await act(() => {
      setValue(storedValue)
    })
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        key,
        JSON.stringify(storedValue),
      )
    })
  })

  it("should get default value if storage value is not valid JSON", async () => {
    console.error = jest.fn()
    const key = "key"
    const givenDefaultValue = { someValue: "value" }
    const storedValue = "{not valid JSON"
    await AsyncStorage.setItem(key, storedValue)
    const { result } = renderHook(() => {
      return useLocalStorage(key, givenDefaultValue)
    })
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(key)
    })
    const [actualValue] = result.current
    expect(actualValue).toEqual(givenDefaultValue)
  })

  it("should catch the error when setting the value to the storage", async () => {
    console.error = jest.fn()
    const key = "key"
    const givenDefaultValue = { someValue: "value" }
    const storedValue = { someValue: "value" }
    const error = new Error("error")
    ;(AsyncStorage.setItem as jest.Mock).mockRejectedValue(error)
    const { result } = renderHook(() => {
      return useLocalStorage(key, givenDefaultValue)
    })
    const [, setValue] = result.current
    await act(() => {
      setValue(storedValue)
    })
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        key,
        JSON.stringify(storedValue),
      )
    })
    expect(console.error).toHaveBeenCalledWith(error)
  })
})
