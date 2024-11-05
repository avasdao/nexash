import BigNumber from "bignumber.js";

export function formatUnits(value: string | number, unitName: string | number) {
  if (!unitName) {
    return value.toString()
  }
  return new BigNumber(value).div(10 ** Number(unitName)).toFixed()
}