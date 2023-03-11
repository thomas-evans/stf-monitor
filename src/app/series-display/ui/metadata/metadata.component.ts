import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { metadata } from '../../data-access/interfaces/full-series';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataComponent  implements OnInit {
  @Input() metadata: metadata | undefined;
  constructor() { }

  ngOnInit() {}

}
