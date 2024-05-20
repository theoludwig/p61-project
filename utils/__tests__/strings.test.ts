import { capitalize } from "../strings"

describe("utils/strings", () => {
  describe("capitalize", () => {
    it("should capitalize the first letter of a string", () => {
      // Arrange - Given
      const string = "hello world"

      // Act - When
      const result = capitalize(string)

      // Assert - Then
      const expected = "Hello world"
      expect(result).toEqual(expected)
    })
  })
})
