import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  NgModule,
  Output,
  ViewChild,
} from '@angular/core';
import { IonAccordionGroup, IonicModule } from '@ionic/angular';
import { MnemonicsService } from './data-access/mnemonics.service';
import {
  AsyncPipe,
  JsonPipe,
  LowerCasePipe,
  NgForOf,
  NgIf,
} from '@angular/common';
import { DataSetComponent } from './ui/data-set/data-set.component';
import { AccordionGroupCustomEvent } from '@ionic/core/dist/types/components/accordion-group/accordion-group-interface';

@Component({
  selector: 'app-data-set-selector',
  templateUrl: './data-set-selector.component.html',
  styleUrls: ['./data-set-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSetSelectorComponent {
  constructor(public mnemonicsService: MnemonicsService) {}
  mnemonics$ = this.mnemonicsService.getMnemonics();
  @Output() seriesRequest = new EventEmitter<string>();

  sendSeriesRequest(event: string) {
    this.seriesRequest.emit(event);
    if (!this.accordionGroup) return;
    this.accordionGroup.value = '';
  }
  @ViewChild('accordion') accordionGroup: IonAccordionGroup | undefined;

  selectedAccordion: string | undefined;
  getAccordionData(event: AccordionGroupCustomEvent) {
    this.selectedAccordion = event.detail.value;
  }
}

@NgModule({
  exports: [DataSetSelectorComponent],
  imports: [IonicModule, NgForOf, AsyncPipe, JsonPipe, NgIf, LowerCasePipe],
  declarations: [DataSetSelectorComponent, DataSetComponent],
})
export class DataSetSelectorModule {}
