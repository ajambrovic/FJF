import { DoorSensorService } from './door-sensor.service';
import { Component, OnInit } from '@angular/core';
import { ALineChartConfig } from '../line-chart/line-chart-config';
import { Colors } from 'ng2-charts';
import { ApplicationError } from '../common/domain/application.error';

@Component({
  selector: 'app-door-sensor',
  templateUrl: './door-sensor.component.html',
  styleUrls: ['./door-sensor.component.scss']
})
export class DoorSensorComponent implements OnInit {
  // @ViewChild('temperatureChart') temperatureChart;
  public isDataAvailable = false;

  public lineChartData: Array<Colors>;

  constructor(
    private lineChartConfig: ALineChartConfig,
    private service: DoorSensorService
  ) { }

  // config start
  public lineChartType = this.lineChartConfig.lineChartType;
  public numberOfDays = this.lineChartConfig.defaultNumberOfDays;
  public lineChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    scales: {
      yAxes: [{
        // scale label
        scaleLabel: {
          // display property
          display: true,
          // actual label
          labelString: 'Aktivnost vrata',
          fontSize: 30,
        },
        ticks: {
          min: 0, // minimum value
          max: 1, // maximum value
        }
      }],
      xAxes: [{
        // scale label
        scaleLabel: {
          // display property
          display: true,

          // actual label
          labelString: 'Doba dana',
          fontSize: 30,
        },
      }]
    }
  };
  public lineChartColors = this.lineChartColors;
  public selectValues = this.lineChartConfig.selectDropdownValues;
  public lineChartLabels = this.lineChartConfig.lineChartLabels;
  // config end

  ngOnInit(): void {
    this.service.getDoorSensorData(this.numberOfDays).subscribe(
      lineChartData => {
        this.lineChartData = lineChartData;
        this.isDataAvailable = true;
      },
      error => {
        throw new ApplicationError(error);
      }
    );
  }

}
