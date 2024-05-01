import { getColorRGBAFromHex } from "../colors"

describe("utils/colors", () => {
  describe("getColorRGBAFromHex", () => {
    it("should return the correct rgba value when given a hex color and opacity (black 0)", () => {
      // Arrange - Given
      const hexColor = "#000000"
      const opacity = 0

      // Act - When
      const result = getColorRGBAFromHex({ hexColor, opacity })

      // Assert - Then
      const expected = "rgba(0, 0, 0, 0)"
      expect(result).toEqual(expected)
    })

    it("should return the correct rgba value when given a hex color and opacity (red 255)", () => {
      // Arrange - Given
      const hexColor = "#FF0000"
      const opacity = 0.5

      // Act - When
      const result = getColorRGBAFromHex({ hexColor, opacity })

      // Assert - Then
      const expected = "rgba(255, 0, 0, 0.5)"
      expect(result).toEqual(expected)
    })

    it("should return the correct rgba value when given a hex color with 3 characters and opacity (red 255)", () => {
      // Arrange - Given
      const hexColor = "#F00"
      const opacity = 0.5

      // Act - When
      const result = getColorRGBAFromHex({ hexColor, opacity })

      // Assert - Then
      const expected = "rgba(255, 0, 0, 0.5)"
      expect(result).toEqual(expected)
    })
  })
})
