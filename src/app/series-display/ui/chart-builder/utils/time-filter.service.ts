import { Injectable } from '@angular/core';
import {
  seriesData,
  timeseries,
} from '../../../data-access/interfaces/full-series';

@Injectable({
  providedIn: 'root',
})
export class TimeFilterService {
  // todo create enum which has the number for each bound to a string
  // todo https://www.typescriptlang.org/docs/handbook/enums.html#enums-at-runtime
  filterTime(data: seriesData, timeFrame: string) {
    const aggregation = data.timeseries.aggregation;
    const now = Date.now();
    const day = 86400000;
    const week = now - day * 7;
    const month = now - day * 30;
    const sixMonths = now - day * 180;
    const year = now - day * 365;
    const tenYears = now - day * 3650;
    const yearToDate = +new Date(new Date().getFullYear(), 0, 1);
    switch (timeFrame) {
      case 'week':
        return this.timeRangeFilter(aggregation, week, now);

      case 'month':
        return this.timeRangeFilter(aggregation, month, now);

      case 'sixMonths':
        return this.timeRangeFilter(aggregation, sixMonths, now);

      case 'year':
        return this.timeRangeFilter(aggregation, year, now);

      case 'tenYears':
        return this.timeRangeFilter(aggregation, tenYears, now);

      case 'yearToDate':
        return this.timeRangeFilter(aggregation, yearToDate, now);

      default:
        return data.timeseries.aggregation;
    }
  }
  private timeRangeFilter(
    data: timeseries['aggregation'],
    lowRange: number,
    highRange: number
  ) {
    return data.filter((value) => {
      const date = +new Date(value[0]);
      return this.isInRange(date, lowRange, highRange);
    });
  }
  private isInRange(value: number, lowNum: number, highNum: number) {
    return value >= lowNum && value <= highNum;
  }
}
