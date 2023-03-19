import { Injectable } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class ChartBuilderService {
  chartBuilder(item: ChartItem, options: ChartConfiguration): Chart {
    return new Chart(item, options);
  }
}
