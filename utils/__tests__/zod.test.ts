import type { ZodIssue } from "zod"
import { ZodError } from "zod"

import { getErrorsFieldsFromZodError } from "../zod"

const zodIssue: ZodIssue = {
  code: "too_small",
  minimum: 1,
  type: "string",
  inclusive: true,
  exact: false,
  message: "String must contain at least 1 character(s)",
  path: ["name"],
}

describe("utils/zod", () => {
  describe("getErrorsFieldsFromZodError", () => {
    it("should return an array of the fields that have errors", () => {
      // Arrange - Given
      const error = new ZodError([
        {
          ...zodIssue,
          path: ["field1"],
        },
        {
          ...zodIssue,
          path: ["field2"],
        },
      ])

      // Act - When
      const result = getErrorsFieldsFromZodError(error)

      // Assert - Then
      const expected = ["field1", "field2"]
      expect(result).toEqual(expected)
    })
  })
})
