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
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { seriesData } from '../../data-access/interfaces/full-series';
import { ReplaySubject } from 'rxjs';
import { ChartBuilderService } from './utils/chart-builder.service';

@Component({
  selector: 'app-chart-builder',
  templateUrl: './chart-builder.component.html',
  styleUrls: ['./chart-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartBuilderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('canvas')
  canvas: ElementRef | undefined;
  chart: Chart | undefined;
  today: Date = new Date();
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
      labels: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            callback: function (val, index) {
              const labelVal = this.getLabelForValue(val as number).split('-');
              return index % 2 === 0
                ? `${labelVal[1]}/${labelVal[0].slice(-2)}`
                : '';
            },
          },
        },
      },
      plugins: {
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
        },
        legend: {
          display: false,
        },
      },
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
    this.fullSeries$.next(data);
    this.chart?.update();
    this.chart?.resetZoom();
  }

  constructor(private buildChart: ChartBuilderService) {
    if (typeof window !== 'undefined') {
      import('chartjs-plugin-zoom').then((zoomPlugin) => {
        Chart.register(...registerables, zoomPlugin.default);
      });
    } else {
      Chart.register(...registerables);
    }
  }

  ngOnDestroy(): void {
    this.fullSeries$.unsubscribe();
  }

  ngOnInit(): void {
    this.fullSeries$.subscribe((value) => {
      this.chartConfig.data.datasets[0].data = value.timeseries.aggregation.map(
        (value) => value[1]
      );
      this.chartConfig.data.labels = value.timeseries.aggregation.map(
        (value) => value[0]
      );
      const aggregationNumbers: Array<number> = value.timeseries.aggregation
        .flat()
        .filter((i): i is number => {
          return typeof i === 'number';
        });
      if (this.chartConfig.options?.plugins?.zoom) {
        this.chartConfig.options.plugins.zoom.limits = {
          y: {
            min: Math.min(...aggregationNumbers),
            max:
              Math.max(...aggregationNumbers) +
              (1 / 100) * Math.max(...aggregationNumbers),
          },
        };
      }
      if (this.chartConfig.options) {
        this.chartConfig.options.scales = {
          ...this.chartConfig.options.scales,
          y: {
            ticks: {
              callback: (val) => {
                const unit_name = value.metadata?.unit.name;
                if (unit_name === 'USD') {
                  return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    notation: 'compact',
                  }).format(val as number);
                } else if (unit_name === 'Percent') {
                  return new Intl.NumberFormat('en-US', {
                    style: 'percent',
                    minimumSignificantDigits: 1,
                    maximumSignificantDigits: 3,
                  }).format((val as number) / 100);
                } else {
                  return val;
                }
              },
            },
          },
        };
      }
      if (this.chartConfig.options?.plugins) {
        this.chartConfig.options.plugins = {
          ...this.chartConfig.options?.plugins,
          tooltip: {
            callbacks: {
              label: function (context) {
                const unit_name = value.metadata?.unit.name;
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  if (unit_name === 'USD') {
                    label += new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      notation: 'compact',
                    }).format(context.parsed.y as number);
                    return label;
                  } else if (unit_name === 'Percent') {
                    label += new Intl.NumberFormat('en-US', {
                      style: 'percent',
                      minimumSignificantDigits: 1,
                      maximumSignificantDigits: 3,
                    }).format((context.parsed.y as number) / 100);
                    return label;
                  } else {
                    return label;
                  }
                } else {
                  return label;
                }
              },
            },
          },
        };
      }
    });
  }
}
