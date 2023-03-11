import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {DataSetSelectorModule} from "./data-set-selector/data-set-selector.component";
import {HttpClientModule} from "@angular/common/http";
import {SeriesDisplayModule} from "./series-display/series-display.component";
import {NgChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), DataSetSelectorModule, HttpClientModule, SeriesDisplayModule, NgChartsModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
