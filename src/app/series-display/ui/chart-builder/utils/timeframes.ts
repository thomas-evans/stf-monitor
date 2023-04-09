export enum Timeframes {
  allTime = 0,
  week = Date.now() - 604800000,
  month = Date.now() - 2592000000,
  sixMonths = Date.now() - 15552000000,
  year = Date.now() - 31536000000,
  tenYears = Date.now() - 315360000000,
  yearToDate = +new Date(new Date().getFullYear(), 0, 1),
}
export type TimeFrameStrings = keyof typeof Timeframes;
