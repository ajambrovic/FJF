import { Colors } from 'ng2-charts';
import { ApplicationError } from './../common/domain/application.error';
import { HumiditySensorService } from './humidity-sensor.service';
import { Component, OnInit } from '@angular/core';
import { ALineChartConfig } from '../line-chart/line-chart-config';

@Component({
  selector: 'app-humidity-sensor',
  templateUrl: './humidity-sensor.component.html',
  styleUrls: ['./humidity-sensor.component.scss']
})
export class HumiditySensorComponent implements OnInit {

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
          labelString: 'Vlažnost zraka [%]',
          fontSize: 30,
        },
        ticks: {
          min: 20, // minimum value
          max: 70, // maximum value
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
    private service: HumiditySensorService
  ) { }

  ngOnInit(): void {
    this.getDataForNumberOfDays(this.numberOfDays);
  }

  private getDataForNumberOfDays(numberOfDays: number) {
    this.service.getHumiditySensorData(numberOfDays).subscribe(
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
