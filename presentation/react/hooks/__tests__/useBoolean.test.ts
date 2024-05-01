import { act, renderHook } from "@testing-library/react-native"

import { useBoolean } from "@/presentation/react/hooks/useBoolean"

describe("presentation/react/hooks/useBoolean", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const initialValues = [true, false]

  for (const initialValue of initialValues) {
    it(`should set the initial value to ${initialValue}`, () => {
      // Arrange - Given
      const { result } = renderHook(() => {
        return useBoolean({ initialValue })
      })

      // Assert - Then
      expect(result.current.value).toBe(initialValue)
    })
  }

  it("should by default set the initial value to false", () => {
    // Arrange - Given
    const { result } = renderHook(() => {
      return useBoolean()
    })

    // Assert - Then
    expect(result.current.value).toBe(false)
  })

  it("should toggle the value", async () => {
    // Arrange - Given
    const { result } = renderHook(() => {
      return useBoolean({ initialValue: false })
    })

    // Act - When
    await act(() => {
      return result.current.toggle()
    })

    // Assert - Then
    expect(result.current.value).toBe(true)

    // Act - When
    await act(() => {
      return result.current.toggle()
    })

    // Assert - Then
    expect(result.current.value).toBe(false)
  })

  it("should set the value to true", async () => {
    // Arrange - Given
    const { result } = renderHook(() => {
      return useBoolean({ initialValue: false })
    })

    // Act - When
    await act(() => {
      return result.current.setTrue()
    })

    // Assert - Then
    expect(result.current.value).toBe(true)
  })

  it("should set the value to false", async () => {
    // Arrange - Given
    const { result } = renderHook(() => {
      return useBoolean({ initialValue: true })
    })

    // Act - When
    await act(() => {
      return result.current.setFalse()
    })

    // Assert - Then
    expect(result.current.value).toBe(false)
  })
})
