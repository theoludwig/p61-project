import { getISODate, getWeekNumber } from "../dates"

describe("utils/dates", () => {
  describe("getISODate", () => {
    it("should return the correct date in ISO format (e.g: 2012-05-23)", () => {
      // Arrange - Given
      const date = new Date("2012-05-23")

      // Act - When
      const result = getISODate(date)

      // Assert - Then
      const expected = "2012-05-23"
      expect(result).toEqual(expected)
    })
  })

  describe("getWeekNumber", () => {
    it("should return the correct week number for a given date (e.g: 2020-01-01)", () => {
      // Arrange - Given
      const date = new Date("2020-01-01")

      // Act - When
      const result = getWeekNumber(date)

      // Assert - Then
      const expected = 1
      expect(result).toEqual(expected)
    })

    it("should return the correct week number for a given date (e.g: 2020-01-08)", () => {
      // Arrange - Given
      const date = new Date("2020-01-08")

      // Act - When
      const result = getWeekNumber(date)

      // Assert - Then
      const expected = 2
      expect(result).toEqual(expected)
    })

    it("should return the correct week number for a given date (e.g: 2020-12-31)", () => {
      // Arrange - Given
      const date = new Date("2020-12-31")

      // Act - When
      const result = getWeekNumber(date)

      // Assert - Then
      const expected = 53
      expect(result).toEqual(expected)
    })
  })
})
