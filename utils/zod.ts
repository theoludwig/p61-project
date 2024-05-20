import type { ZodError } from "zod"

export const getErrorsFieldsFromZodError = <T>(
  error: ZodError<T>,
): Array<keyof T> => {
  const fields = Object.keys(error.format()) as Array<keyof T>
  return fields.filter((field) => {
    return field !== "_errors"
  })
}
