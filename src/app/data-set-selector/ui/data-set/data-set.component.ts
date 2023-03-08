import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataSetComponent {

  constructor() {
  }


}
