import { Injectable } from '@angular/core';
import { seriesData } from '../../../data-access/interfaces/full-series';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class TimeFilterService {
  filterTime(data: seriesData, timeFrame: string) {
    const dataClone = cloneDeep(data);
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
        dataClone.timeseries.aggregation =
          dataClone.timeseries.aggregation.filter((value) => {
            const date = +new Date(value[0]);
            return date >= week && date <= now;
          });
        return dataClone;
      case 'month':
        dataClone.timeseries.aggregation =
          dataClone.timeseries.aggregation.filter((value) => {
            const date = +new Date(value[0]);
            return date >= month && date <= now;
          });
        return dataClone;

      case 'sixMonths':
        dataClone.timeseries.aggregation =
          dataClone.timeseries.aggregation.filter((value) => {
            const date = +new Date(value[0]);
            return date >= sixMonths && date <= now;
          });
        return dataClone;
      case 'year':
        dataClone.timeseries.aggregation =
          dataClone.timeseries.aggregation.filter((value) => {
            const date = +new Date(value[0]);
            return date >= year && date <= now;
          });
        return dataClone;
      case 'tenYears':
        dataClone.timeseries.aggregation =
          dataClone.timeseries.aggregation.filter((value) => {
            const date = +new Date(value[0]);
            return date >= tenYears && date <= now;
          });
        return dataClone;
      case 'yearToDate':
        dataClone.timeseries.aggregation =
          dataClone.timeseries.aggregation.filter((value) => {
            const date = +new Date(value[0]);
            return date >= yearToDate && date <= now;
          });
        return dataClone;
      case 'allTime':
        return dataClone;
      default:
        return dataClone;
    }
  }
}
