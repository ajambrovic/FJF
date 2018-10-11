import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoorSensorComponent } from './door-sensor.component';
import { DoorSensorService } from './door-sensor.service';
import 'chart.js/dist/Chart.min.js';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    NgbModule,
    FormsModule
  ],
  declarations: [DoorSensorComponent],
  providers: [DoorSensorService],
  exports: [DoorSensorComponent],
})
export class DoorSensorModule { }
