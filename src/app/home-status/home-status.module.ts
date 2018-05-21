import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'chart.js/dist/Chart.min.js';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HomeStatusComponent } from './home-status.component';
import { HomeStatusService } from './home-status.service';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    NgbModule,
    FormsModule
  ],
  declarations: [HomeStatusComponent],
  providers: [HomeStatusService],
  exports: [HomeStatusComponent]
})
export class HomeStatusModule { }
