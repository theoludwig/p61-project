import { useCallback, useEffect, useRef, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

type UseLocalStorageResult<T> = [T, React.Dispatch<React.SetStateAction<T>>]

export const useLocalStorage = <T extends unknown>(
  key: string,
  defaultValue: T,
): UseLocalStorageResult<T> => {
  const hasSaved = useRef(false)
  const [value, setValue] = useState<T>(defaultValue)

  const getFromLocalStorage = useCallback(async (): Promise<T> => {
    const value = await AsyncStorage.getItem(key)
    hasSaved.current = true
    if (value == null) {
      return defaultValue
    }
    return JSON.parse(value) as T
  }, [key, defaultValue])

  useEffect(() => {
    if (!hasSaved.current) {
      return
    }
    AsyncStorage.setItem(key, JSON.stringify(value)).catch((error) => {
      console.error(error)
    })
  }, [key, value])

  useEffect(() => {
    getFromLocalStorage()
      .then((value) => {
        setValue(value)
      })
      .catch((error) => {
        setValue(defaultValue)
        console.error(error)
      })
  }, [defaultValue, getFromLocalStorage])

  return [value, setValue]
}
