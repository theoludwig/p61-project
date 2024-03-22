import type { ZodError } from "zod"

export const zodPresenter = {
  getErrorsFieldsFromZodError: <T>(error: ZodError<T>): Array<keyof T> => {
    return Object.keys(error.format()) as Array<keyof T>
  },
}
