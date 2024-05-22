import { calculateRatio } from "../maths"

describe("utils/maths", () => {
  describe("calculateRatio", () => {
    it("should calculate the ratio of a value to a total", () => {
      // Arrange - Given
      const value = 3
      const total = 10

      // Act - When
      const result = calculateRatio(value, total)

      // Assert - Then
      const expected = 0.3
      expect(result).toEqual(expected)
    })

    it("should return 0 if the total is 0", () => {
      // Arrange - Given
      const value = 3
      const total = 0

      // Act - When
      const result = calculateRatio(value, total)

      // Assert - Then
      const expected = 0
      expect(result).toEqual(expected)
    })

    it("should return 0 if the total is negative", () => {
      // Arrange - Given
      const value = 3
      const total = -1

      // Act - When
      const result = calculateRatio(value, total)

      // Assert - Then
      const expected = 0
      expect(result).toEqual(expected)
    })

    it("should return 0 if the value is 0", () => {
      // Arrange - Given
      const value = 0
      const total = 10

      // Act - When
      const result = calculateRatio(value, total)

      // Assert - Then
      const expected = 0
      expect(result).toEqual(expected)
    })

    it("should return 1 if the value is equal to the total", () => {
      // Arrange - Given
      const value = 10
      const total = 10

      // Act - When
      const result = calculateRatio(value, total)

      // Assert - Then
      const expected = 1
      expect(result).toEqual(expected)
    })

    it("should return 1 if the value is greater than the total", () => {
      // Arrange - Given
      const value = 11
      const total = 10

      // Act - When
      const result = calculateRatio(value, total)

      // Assert - Then
      const expected = 1
      expect(result).toEqual(expected)
    })
  })
})
