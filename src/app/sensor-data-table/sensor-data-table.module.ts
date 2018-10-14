import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorDataTableComponent } from './sensor-data-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SensorDataTableComponent],
  exports: [SensorDataTableComponent]
})
export class SensorDataTableModule { }
