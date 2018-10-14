import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartService } from './line-chart.service';
import { LineChartComponent } from './line-chart.component';
import 'chart.js/dist/Chart.min.js';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SensorDataTableModule } from '../sensor-data-table/sensor-data-table.module';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    NgbModule,
    FormsModule,
    SensorDataTableModule
  ],
  declarations: [LineChartComponent],
  providers: [LineChartService],
  exports: [LineChartComponent]
})
export class LineChartModule { }
