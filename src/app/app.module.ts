import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LineChartService } from './line-chart/line-chart.service';
import { LineChartModule } from './line-chart/line-chart.module';
import { HttpClientModule } from '@angular/common/http';
import { ToasterModule, ToasterService } from 'angular2-toaster';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LineChartModule,
    HttpClientModule
  ],
  providers: [LineChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
