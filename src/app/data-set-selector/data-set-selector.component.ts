import {ChangeDetectionStrategy, Component, EventEmitter, NgModule, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {MnemonicsService} from "./data-access/mnemonics.service";
import {AsyncPipe, JsonPipe, LowerCasePipe, NgForOf, NgIf} from "@angular/common";
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
  @Output() seriesRequest = new EventEmitter<string>();
  loadDataSet: boolean = false;
  sendSeriesRequest(event: string) {
    this.seriesRequest.emit(event);
  }
  selectedAccordion: string | undefined;
  getAccordionData(event: any) {
    console.log(event);
    this.selectedAccordion = event.detail.value;
  }
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
    NgIf,
    LowerCasePipe
  ],
  declarations: [DataSetSelectorComponent, DataSetComponent]
})
export class DataSetSelectorModule {
}
