import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DataSetService } from '../../data-access/data-set.service';
import { Subject } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSetComponent {
  constructor(
    public dataSet: DataSetService,
    private menuController: MenuController
  ) {}

  @Input()
  set mnemonic(value: string) {
    this.mnemonic$.next(value);
  }

  @Output() seriesRequest = new EventEmitter<string>();

  mnemonic$ = new Subject<string>();
  dataSet$ = this.dataSet.getDataSets(this.mnemonic$);

  emitSeriesRequest(mnemonic: string) {
    this.menuController.close().then(() => this.seriesRequest.emit(mnemonic));
  }
}
