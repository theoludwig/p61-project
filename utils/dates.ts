export const ONE_DAY_MILLISECONDS = 1_000 * 60 * 60 * 24

/**
 * Returns a date as a string value in ISO format (without time information).
 *
 * @param date
 * @returns
 * @example getISODate(new Date("2012-05-23")) // "2012-05-23"
 */
export const getISODate = (date: Date): string => {
  return date.toISOString().slice(0, 10)
}

export const getNowDate = (): Date => {
  const date = new Date()
  const milliseconds = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  )
  return new Date(milliseconds)
}

/**
 * Get the week number [1-52] for a given date.
 * @param {Date} date
 * @returns {number}
 * @example getWeekNumber(new Date(2020, 0, 1)) // 1
 * @example getWeekNumber(new Date(2020, 0, 8)) // 2
 */
export const getWeekNumber = (date: Date): number => {
  const dateCopy = new Date(date.getTime())
  dateCopy.setHours(0, 0, 0, 0)
  dateCopy.setDate(dateCopy.getDate() + 3 - ((dateCopy.getDay() + 6) % 7))
  const week1 = new Date(dateCopy.getFullYear(), 0, 4)
  return (
    1 +
    Math.round(
      ((dateCopy.getTime() - week1.getTime()) / ONE_DAY_MILLISECONDS -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    )
  )
}
