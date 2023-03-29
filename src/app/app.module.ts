import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { DataSetSelectorModule } from './data-set-selector/data-set-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { SeriesDisplayModule } from './series-display/series-display.component';
import { chartFactory } from './chart-factory';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    IonicModule.forRoot(),
    DataSetSelectorModule,
    HttpClientModule,
    SeriesDisplayModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: chartFactory, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
