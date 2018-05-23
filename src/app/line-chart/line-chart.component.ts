import { Component, OnInit, ViewChild } from '@angular/core';
import { LineChartService } from './line-chart.service';
import { ApplicationError } from '../common/domain/application.error';
import { ALineChartConfig } from './line-chart-config';
import { Colors } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @ViewChild('temperatureChart') temperatureChart;
  public isDataAvailable = false;

  public lineChartData: Array<Colors>;

  constructor(
    private lineChartConfig: ALineChartConfig,
    private service: LineChartService
  ) { }

  // config start
  public lineChartType = this.lineChartConfig.lineChartType;
  public numberOfDays = this.lineChartConfig.defaultNumberOfDays;
  public lineChartOptions = this.lineChartConfig.lineChartOptions;
  public lineChartColors = this.lineChartColors;
  public selectValues = this.lineChartConfig.selectDropdownValues;
  public lineChartLabels = this.lineChartConfig.lineChartLabels;
  // config end

  ngOnInit(): void {
    this.service.getTemperature(this.numberOfDays).subscribe(
      lineChartData => {
        this.lineChartData = lineChartData;
        this.isDataAvailable = true;
      },
      error => {
        throw new ApplicationError(error);
      }
    );
  }

  public onChange(newNumberOfDays) {
    this.numberOfDays = newNumberOfDays;
    this.service.getTemperature(this.numberOfDays).subscribe(
      lineChartData => {
        this.lineChartData = [];
        lineChartData.forEach(dataElement => {
          this.lineChartData.push(dataElement);
        });
      },
      error => {
        throw new ApplicationError(error);
      }
    );
  }

  public downloadCanvas($event) {
    const anchor = <HTMLAnchorElement>$event.target;
    anchor.href = this.temperatureChart.nativeElement.toDataURL();
    // set the anchors 'download' attibute (name of the file to be downloaded)
    const filename = 'Temperatura: ' + this.lineChartData[0].label + '_' + this.lineChartData[this.lineChartData.length - 1].label;
    anchor.download = filename + '.png';
  }
}
