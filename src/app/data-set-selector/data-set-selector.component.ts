import {ChangeDetectionStrategy, Component, NgModule} from '@angular/core';

@Component({
  selector: 'app-data-set-selector',
  templateUrl: './data-set-selector.component.html',
  styleUrls: ['./data-set-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataSetSelectorComponent {

  constructor() {
  }


}

@NgModule({
  declarations: [DataSetSelectorComponent]
})
export class DataSetSelectorModule {
}
