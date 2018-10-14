import { Component, Input } from '@angular/core';
import { TableModel } from './domain/table-model';

@Component({
  selector: 'app-sensor-data-table',
  templateUrl: './sensor-data-table.component.html',
  styleUrls: ['./sensor-data-table.component.scss']
})
export class SensorDataTableComponent {

  public isDataAvailable: boolean;
  @Input()
  public tableModel: TableModel;

  constructor(
  ) { }

}
