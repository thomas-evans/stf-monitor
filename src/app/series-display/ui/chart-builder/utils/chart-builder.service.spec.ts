import { TestBed } from '@angular/core/testing';

import { ChartBuilderService } from './chart-builder.service';
import { Chart } from 'chart.js';

describe('ChartBuilderService', () => {
  let service: ChartBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('chartBuilder', () => {
    it('should build a new Chart object when called', () => {
      const canVas = document.createElement('canvas');
      let newChart: Chart | undefined = undefined;
      expect(newChart).toEqual(undefined);
      newChart = service.chartBuilder(canVas, {
        type: 'line',
        data: { datasets: [] },
      });
      expect(newChart).toBeInstanceOf(Chart);
    });
  });
});
