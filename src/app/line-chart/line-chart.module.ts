import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartService } from './line-chart.service';
import { LineChartComponent } from './line-chart.component';
import { ToasterModule } from 'angular2-toaster';
import 'chart.js/dist/Chart.min.js';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ToasterModule.forRoot(),
    ChartsModule,
    NgbModule
  ],
  declarations: [LineChartComponent],
  providers: [LineChartService],
  exports: [LineChartComponent]
})
export class LineChartModule { }
