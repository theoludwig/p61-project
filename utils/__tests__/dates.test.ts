import { getISODate, getNowDateUTC, getWeekNumber } from "../dates"

describe("utils/dates", () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
    jest.useRealTimers()
  })

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

  describe("getNowDateUTC", () => {
    it("should return the current UTC date", () => {
      // Arrange - Given
      const mockDate = new Date("2024-05-01T12:00:00Z")
      jest.useFakeTimers({ now: mockDate })
      Date.UTC = jest.fn(() => {
        return mockDate.getTime()
      })

      // Act - When
      const result = getNowDateUTC()

      // Assert - Then
      const expected = new Date("2024-05-01T12:00:00.000Z")
      expect(result).toEqual(expected)
      expect(Date.UTC).toHaveBeenCalledTimes(1)
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
