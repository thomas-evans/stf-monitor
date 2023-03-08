import {ChangeDetectionStrategy, Component, NgModule} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {MnemonicsService} from "./data-access/mnemonics.service";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {DataSetComponent} from "./ui/data-set/data-set.component";

@Component({
  selector: 'app-data-set-selector',
  templateUrl: './data-set-selector.component.html',
  styleUrls: ['./data-set-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataSetSelectorComponent {
  constructor(public mnemonicsService: MnemonicsService) {
  }
  mnemonics$ = this.mnemonicsService.getMnemonics();
}

@NgModule({
  exports: [
    DataSetSelectorComponent
  ],
  imports: [
    IonicModule,
    NgForOf,
    AsyncPipe,
    JsonPipe,
    NgIf
  ],
  declarations: [DataSetSelectorComponent, DataSetComponent]
})
export class DataSetSelectorModule {
}
