import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart-builder',
  templateUrl: './chart-builder.component.html',
  styleUrls: ['./chart-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartBuilderComponent  implements OnInit {

  @Input() aggregation:  [[string, number | null]] = [['', null]];
  constructor() { }

  ngOnInit() {}

}
