import { TestBed } from '@angular/core/testing';

import { ChartBuilderService } from './chart-builder.service';
import { Chart, registerables } from 'chart.js';
import { chartConfig } from '../../../../../test-helpers/chart-config';
import {
  seriesDataPercent,
  seriesDataUnknownUnit,
  seriesDataUSD,
} from '../../../../../test-helpers/series-data';
Chart.register(...registerables);
describe('ChartBuilderService', () => {
  let service: ChartBuilderService;
  let canvas: HTMLCanvasElement | undefined;
  let testChart: Chart | undefined;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartBuilderService);
    canvas = document.createElement('canvas');
    canvas.id = String(Math.random());
    testChart = new Chart(canvas, chartConfig);
    testChart.update('none');
  });
  afterEach(() => {
    testChart = undefined;
    canvas = undefined;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('chartBuilder', () => {
    it('should build a new Chart object when called', () => {
      if (testChart && canvas) {
        const specialCanvas = document.createElement('canvas');
        let newChart: Chart | undefined = undefined;
        expect(newChart).toEqual(undefined);
        newChart = service.chartBuilder(specialCanvas, chartConfig);
        expect(newChart).toBeInstanceOf(Chart);
      }
    });
  });
  describe('xScaleCallback', () => {
    it('should return a truncated date string', () => {
      if (testChart && canvas) {
        testChart.data.datasets[0].data =
          seriesDataUSD.timeseries.aggregation.map((value) => value[1]);
        testChart.data.labels = seriesDataUSD.timeseries.aggregation.map(
          (value) => value[0]
        );
        const xScaleCallback = testChart.options?.scales?.['x']?.ticks;
        if (xScaleCallback) xScaleCallback.callback = service.xScaleCallback();
        testChart.update('none');
        expect(testChart.scales['x'].ticks[0].label).toEqual('11/10');
      }
    });
  });
  describe('yScaleCallback', () => {
    it('should return USD currency format if unit_name is USD', () => {
      if (testChart && canvas) {
        testChart.data.datasets[0].data =
          seriesDataUSD.timeseries.aggregation.map((value) => value[1]);
        testChart.data.labels = seriesDataUSD.timeseries.aggregation.map(
          (value) => value[0]
        );
        const yScaleCallback = testChart.options?.scales?.['y']?.ticks;
        if (yScaleCallback)
          yScaleCallback.callback = service.yScaleCallback(seriesDataUSD);
        testChart.update('none');
        expect(testChart.scales['y'].ticks[0].label).toEqual('$400B');
      }
    });
    it('should return Percent format if unit_name is Percent', () => {
      if (testChart && canvas) {
        testChart.data.datasets[0].data =
          seriesDataPercent.timeseries.aggregation.map((value) => value[1]);
        testChart.data.labels = seriesDataPercent.timeseries.aggregation.map(
          (value) => value[0]
        );
        const yScaleCallback = testChart.options?.scales?.['y']?.ticks;
        if (yScaleCallback)
          yScaleCallback.callback = service.yScaleCallback(seriesDataPercent);
        testChart.update('none');
        expect(testChart.scales['y'].ticks[0].label).toEqual('1.5%');
      }
    });
    it('should return unformatted string of tickValue if unit_name is not matched by a conditional', () => {
      if (testChart && canvas) {
        testChart.data.datasets[0].data =
          seriesDataUnknownUnit.timeseries.aggregation.map((value) => value[1]);
        testChart.data.labels =
          seriesDataUnknownUnit.timeseries.aggregation.map((value) => value[0]);
        const yScaleCallback = testChart.options?.scales?.['y']?.ticks;
        if (yScaleCallback)
          yScaleCallback.callback = service.yScaleCallback(
            seriesDataUnknownUnit
          );
        testChart.update('none');
        expect(testChart.scales['y'].ticks[0].label).toEqual('400000000000');
      }
    });
  });
});
