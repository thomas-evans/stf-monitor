import { Injectable } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, Scale } from 'chart.js';
import { seriesData } from '../../../data-access/interfaces/full-series';
import {
  TooltipCallbacks,
  TooltipItem,
  TooltipModel,
} from 'chart.js/dist/types';

@Injectable({
  providedIn: 'root',
})
export class ChartBuilderService {
  chartBuilder(item: ChartItem, options: ChartConfiguration): Chart {
    return new Chart(item, options);
  }
  xScaleCallback() {
    return function (this: Scale, tickValue: number | string, index: number) {
      const labelVal = this.getLabelForValue(tickValue as number).split('-');
      return index % 2 === 0 ? `${labelVal[1]}/${labelVal[0].slice(-2)}` : '';
    };
  }
  yScaleCallback(seriesDataObj: seriesData) {
    const unit_name = seriesDataObj.metadata?.unit.name;
    return function (this: Scale, tickValue: number | string) {
      if (typeof tickValue !== 'number') return tickValue;
      if (unit_name === 'USD') {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          notation: 'compact',
        }).format(tickValue);
      } else if (unit_name === 'Percent') {
        return new Intl.NumberFormat('en-US', {
          style: 'percent',
          minimumSignificantDigits: 1,
          maximumSignificantDigits: 3,
        }).format(tickValue / 100);
      } else {
        return String(tickValue);
      }
    };
  }
  labelCallback(seriesDataObj: seriesData): TooltipCallbacks<'line'>['label'] {
    return function (this: TooltipModel, tooltipItem: TooltipItem<'line'>) {
      const unit_name = seriesDataObj.metadata?.unit.name;
      if (unit_name === 'USD') {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          notation: 'compact',
        }).format(tooltipItem.parsed.y);
      } else if (unit_name === 'Percent') {
        return new Intl.NumberFormat('en-US', {
          style: 'percent',
          minimumSignificantDigits: 1,
          maximumSignificantDigits: 3,
        }).format(tooltipItem.parsed.y / 100);
      } else {
        return;
      }
    };
  }
}
