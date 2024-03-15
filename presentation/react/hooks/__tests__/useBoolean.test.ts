import { act, renderHook } from "@testing-library/react-native"

import { useBoolean } from "@/presentation/react/hooks/useBoolean"

describe("hooks/useBoolean", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const initialValues = [true, false]

  for (const initialValue of initialValues) {
    it(`should set the initial value to ${initialValue}`, () => {
      const { result } = renderHook(() => {
        return useBoolean({ initialValue })
      })
      expect(result.current.value).toBe(initialValue)
    })
  }

  it("should by default set the initial value to false", () => {
    const { result } = renderHook(() => {
      return useBoolean()
    })
    expect(result.current.value).toBe(false)
  })

  it("should toggle the value", async () => {
    const { result } = renderHook(() => {
      return useBoolean({ initialValue: false })
    })
    await act(() => {
      return result.current.toggle()
    })
    expect(result.current.value).toBe(true)
    await act(() => {
      return result.current.toggle()
    })
    expect(result.current.value).toBe(false)
  })

  it("should set the value to true", async () => {
    const { result } = renderHook(() => {
      return useBoolean({ initialValue: false })
    })
    await act(() => {
      return result.current.setTrue()
    })
    expect(result.current.value).toBe(true)
  })

  it("should set the value to false", async () => {
    const { result } = renderHook(() => {
      return useBoolean({ initialValue: true })
    })
    await act(() => {
      return result.current.setFalse()
    })
    expect(result.current.value).toBe(false)
  })
})
