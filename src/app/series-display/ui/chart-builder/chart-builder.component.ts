import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {Chart, ChartConfiguration, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {seriesData} from "../../data-access/interfaces/full-series";
import {ReplaySubject} from "rxjs";

@Component({
  selector: 'app-chart-builder',
  templateUrl: './chart-builder.component.html',
  styleUrls: ['./chart-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBuilderComponent implements OnInit, OnDestroy {
  public fullSeries$: ReplaySubject<seriesData> = new ReplaySubject();

  @Input() set fullSeries(data: seriesData) {
    this.fullSeries$.next(data);
    this.chart?.update();
  }

  constructor() {
    Chart.register()
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: '',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      y:
        {
          position: 'left',
        }
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnDestroy(): void {
    this.fullSeries$.unsubscribe();
  }

  ngOnInit(): void {
    this.fullSeries$.subscribe(value => {
      this.lineChartData.datasets[0].data = value.timeseries.aggregation.map(value => value[1]);
      this.lineChartData.labels = value.timeseries.aggregation.map(value => value[0]);
      this.lineChartData.datasets[0].label = value.metadata?.unit.name;
    });
  }
}
