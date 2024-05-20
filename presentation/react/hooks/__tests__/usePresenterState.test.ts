import { act, renderHook } from "@testing-library/react-native"

import { Presenter } from "@/presentation/presenters/_Presenter"
import { usePresenterState } from "@/presentation/react/hooks/usePresenterState"

interface MockCountPresenterState {
  count: number
}

class MockCountPresenter extends Presenter<MockCountPresenterState> {
  public constructor(initialState: MockCountPresenterState) {
    super(initialState)
  }

  public increment(): void {
    this.setState((state) => {
      state.count = state.count + 1
    })
  }
}

describe("presentation/react/hooks/usePresenterState", () => {
  it("should return the initial state from the presenter", async () => {
    // Arrange - Given
    const initialState = { count: 0 }
    const presenter = new MockCountPresenter(initialState)

    // Act - When
    const { result } = renderHook(() => {
      return usePresenterState(presenter)
    })

    // Assert - Then
    expect(result.current).toEqual(initialState)
  })

  it("should update state when presenter state changes", async () => {
    // Arrange - Given
    const initialState = { count: 0 }
    const presenter = new MockCountPresenter(initialState)
    const subscribe = jest.spyOn(presenter, "subscribe")
    const { result } = renderHook(() => {
      return usePresenterState(presenter)
    })

    // Act - When
    await act(() => {
      presenter.increment()
    })

    // Assert - Then
    expect(result.current.count).toBe(1)
    expect(subscribe).toHaveBeenCalledTimes(1)
  })

  it("should unsubscribe from presenter on unmount", async () => {
    // Arrange - Given
    const initialState = { count: 0 }
    const presenter = new MockCountPresenter(initialState)
    const unsubscribe = jest.spyOn(presenter, "unsubscribe")
    const { result, unmount } = renderHook(() => {
      return usePresenterState(presenter)
    })

    // Act - When
    unmount()
    await act(() => {
      presenter.increment()
    })

    // Assert - Then
    expect(result.current.count).toBe(0)
    expect(unsubscribe).toHaveBeenCalledTimes(1)
  })
})
