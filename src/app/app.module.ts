import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { DataSetSelectorModule } from './data-set-selector/data-set-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { SeriesDisplayModule } from './series-display/series-display.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    DataSetSelectorModule,
    HttpClientModule,
    SeriesDisplayModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
