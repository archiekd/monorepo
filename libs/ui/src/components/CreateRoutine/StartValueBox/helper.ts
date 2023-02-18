export const displayNumWith1Decimal = (num: number): string => {
  if (typeof num !== "number") return "-"
  return (Math.round(num * 100) / 100).toFixed(1)
}
