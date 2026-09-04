export function mix(color1: string, color2: string, weight: number): string {
  let result = '#';
  for (let i = 1; i < 7; i += 2) {
    const color1Part = parseInt(color1.substring(i, i + 2), 16);
    const color2Part = parseInt(color2.substring(i, i + 2), 16);
    const resultPart = Math.floor(color2Part + (color1Part - color2Part) * (weight / 100)).toString(16);
    result += `0${resultPart}`.slice(-2);
  }
  return result;
}

export const tint = (color: string, weight: number) => mix('#ffffff', color, weight);
export const shade = (color: string, weight: number) => mix('#000000', color, weight);
