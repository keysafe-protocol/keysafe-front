import numeral from "numeral";

// Long numbers are displayed in sections with numbers
export function optimize(value: number | string, formatStr = "0,0.[00]") {
  return numeral(value).format(formatStr);
}
