import { Injectable } from '@angular/core';
import {
  seriesData,
  timeseries,
} from '../../../data-access/interfaces/full-series';
import { Timeframes, TimeFrameStrings } from './timeframes';

@Injectable({
  providedIn: 'root',
})
export class TimeFilterService {
  filterTime(data: seriesData, timeFrame: TimeFrameStrings) {
    if (timeFrame === 'allTime') {
      return data.timeseries.aggregation;
    } else {
      return this.timeRangeFilter(
        data.timeseries.aggregation,
        Timeframes[timeFrame],
        Date.now()
      );
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
