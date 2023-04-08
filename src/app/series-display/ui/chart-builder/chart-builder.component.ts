import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { seriesData } from '../../data-access/interfaces/full-series';
import { ReplaySubject } from 'rxjs';
import { ChartBuilderService } from './utils/chart-builder.service';
import { SegmentCustomEvent } from '@ionic/core/dist/types/components/segment/segment-interface';
import { TimeFilterService } from './utils/time-filter.service';

@Component({
  selector: 'app-chart-builder',
  templateUrl: './chart-builder.component.html',
  styleUrls: ['./chart-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartBuilderComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private buildChart: ChartBuilderService,
    private timeFilter: TimeFilterService
  ) {}

  @ViewChild('canvas') canvas: ElementRef | undefined;

  chart: Chart | undefined;

  today: Date = new Date();

  seriesDataSet: seriesData | undefined;

  public fullSeries$: ReplaySubject<seriesData> = new ReplaySubject();

  chartConfig: ChartConfiguration = {
    type: 'line',
    data: {
      datasets: [
        {
          data: [],
          backgroundColor: 'rgba(0,24,113,0.2)',
          borderColor: 'rgba(0,24,113,1)',
          pointBackgroundColor: 'rgba(0,24,113,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(0,24,113,0.8)',
          fill: 'origin',
        },
      ],
    },
  };

  ngAfterViewInit() {
    this.chart = this.buildChart.chartBuilder(
      this.canvas?.nativeElement,
      this.chartConfig
    );
    this.chart.render();
  }

  @Input() set fullSeries(data: seriesData) {
    this.seriesDataSet = data;
    this.updateData(data);
  }

  getSegmentEvent(event: SegmentCustomEvent) {
    if (event.detail.value) {
      if (this.seriesDataSet !== undefined) {
        this.updateData(
          this.timeFilter.filterTime(this.seriesDataSet, event.detail.value)
        );
      }
    }
  }

  updateData(data: seriesData) {
    this.fullSeries$.next(data);
  }

  ngOnDestroy(): void {
    this.fullSeries$.unsubscribe();
  }

  ngOnInit(): void {
    this.fullSeries$.subscribe((value) => {
      const aggregationNumbers: Array<number> = value.timeseries.aggregation
        .flat()
        .filter((i): i is number => {
          return typeof i === 'number';
        });
      this.chartConfig.data.datasets[0].data = value.timeseries.aggregation.map(
        (value) => value[1]
      );
      this.chartConfig.data.labels = value.timeseries.aggregation.map(
        (value) => value[0]
      );
      this.chartConfig.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              callback: this.buildChart.xScaleCallback(),
            },
          },
          y: {
            ticks: {
              stepSize:
                value.metadata?.unit.name === 'Percent' ? 0.01 : undefined,
              callback: this.buildChart.yScaleCallback(value),
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          zoom: {
            pan: {
              enabled: true,
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
            limits: {
              y: {
                min: Math.min(...aggregationNumbers),
                max:
                  Math.max(...aggregationNumbers) +
                  (1 / 100) * Math.max(...aggregationNumbers),
              },
            },
          },
          tooltip: {
            callbacks: {
              label: this.buildChart.labelCallback(value),
            },
          },
        },
      };
      this.chart?.update();
      this.chart?.resetZoom();
    });
  }
}
