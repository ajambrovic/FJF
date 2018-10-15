import { DoorSensorService } from './door-sensor.service';
import { Colors } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import { ALineChartConfig } from '../line-chart/line-chart-config';
import { ApplicationError } from '../common/domain/application.error';

@Component({
  selector: 'app-door-sensor',
  templateUrl: './door-sensor.component.html',
  styleUrls: ['./door-sensor.component.scss']
})
export class DoorSensorComponent implements OnInit {

  public isDataAvailable = false;
  public lineChartData: Array<Colors>;

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
          labelString: 'Aktivnost',
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

  constructor(
    private lineChartConfig: ALineChartConfig,
    private service: DoorSensorService
  ) { }


  ngOnInit(): void {
    this.getDataForNumberOfDays(this.numberOfDays);
  }

  private getDataForNumberOfDays(numberOfDays: number) {
    this.service.getDoorSensorData(numberOfDays).subscribe(
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
