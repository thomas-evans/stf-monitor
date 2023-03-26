import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  series = '';
  constructor(private menuController: MenuController) {}
  openMenu() {
    this.menuController.open().then((r) => r);
  }
  seriesLoaded = false;
  sendSeriesRequest(series: string) {
    this.series = series;
    this.seriesLoaded = true;
  }
  loadMenu = false;
}
