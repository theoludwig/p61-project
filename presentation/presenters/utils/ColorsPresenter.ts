export const colorsPresenter = {
  hexToRgbA: (hexColor: string, opacity: number): string => {
    let hex = hexColor.replace("#", "")
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => {
          return char + char
        })
        .join("")
    }
    const color = Number.parseInt(hex, 16)
    const red = (color >> 16) & 255
    const green = (color >> 8) & 255
    const blue = color & 255
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`
  },
}
