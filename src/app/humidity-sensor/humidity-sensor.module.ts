import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HumiditySensorComponent } from './humidity-sensor.component';
import { HumiditySensorService } from './humidity-sensor.service';
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
  declarations: [HumiditySensorComponent],
  providers: [HumiditySensorService, DatePipe],
  exports: [HumiditySensorComponent]
})
export class HumiditySensorModule { }
