import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoorSensorComponent } from './door-sensor.component';
import { DoorSensorService } from './door-sensor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DoorSensorComponent],
  providers: [DoorSensorService],
  exports: [DoorSensorComponent],
})
export class DoorSensorModule { }
