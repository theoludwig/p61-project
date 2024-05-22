export const calculateRatio = (value: number, total: number): number => {
  if (total <= 0) {
    return 0
  }
  if (value >= total) {
    return 1
  }
  return value / total
}
