import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { FullSeriesService } from './data-access/full-series.service';
import { ChartBuilderComponent } from './ui/chart-builder/chart-builder.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-series-display',
  templateUrl: './series-display.component.html',
  styleUrls: ['./series-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesDisplayComponent {
  public series$ = new Subject<string>();

  @Input()
  set series(series: string) {
    this.series$.next(series);
  }

  fullSeries$ = this.fullSeries.getFullSeries(this.series$);

  constructor(public fullSeries: FullSeriesService) {}
}

@NgModule({
  declarations: [SeriesDisplayComponent, ChartBuilderComponent],
  exports: [SeriesDisplayComponent],
  imports: [CommonModule, IonicModule],
})
export class SeriesDisplayModule {}
