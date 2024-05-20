import { getVersion } from "../version"
import { version } from "@/package.json"

describe("utils/version", () => {
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
  })

  afterEach(() => {
    process.env = env
    jest.clearAllMocks()
  })

  it("should return '0.0.0-development' when NODE_ENV is 'development'", () => {
    // Arrange - Given
    process.env["NODE_ENV"] = "development"

    // Act - When
    const result = getVersion()

    // Assert - Then
    const expected = "0.0.0-development"
    expect(result).toEqual(expected)
  })

  it("should return the version from package.json when NODE_ENV is not 'development'", () => {
    // Arrange - Given
    process.env["NODE_ENV"] = "production"

    // Act - When
    const result = getVersion()

    // Assert - Then
    expect(result).toEqual(version)
  })
})
