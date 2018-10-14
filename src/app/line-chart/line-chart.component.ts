import { Component, OnInit, ViewChild } from '@angular/core';
import { LineChartService } from './line-chart.service';
import { ApplicationError } from '../common/domain/application.error';
import { ALineChartConfig } from './line-chart-config';
import { Colors } from 'ng2-charts';
import { TableModel } from '../sensor-data-table/domain/table-model';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @ViewChild('temperatureChart') temperatureChart;

  public isDataAvailable = false;
  public lineChartData: Array<Colors>;
  public tableModel: TableModel;

  // config start
  public lineChartType = this.lineChartConfig.lineChartType;
  public numberOfDays = this.lineChartConfig.defaultNumberOfDays;
  public lineChartOptions = this.lineChartConfig.lineChartOptions;
  public lineChartColors = this.lineChartColors;
  public selectValues = this.lineChartConfig.selectDropdownValues;
  public lineChartLabels = this.lineChartConfig.lineChartLabels;
  // config end

  constructor(
    private lineChartConfig: ALineChartConfig,
    private service: LineChartService
  ) { }

  ngOnInit(): void {
    this.getDataForNumberOfDays(this.numberOfDays);
  }

  private getDataForNumberOfDays(numberOfDays: number) {
    this.service.getTemperature(numberOfDays).subscribe(
      lineChartData => {
        this.lineChartData = lineChartData;
        this.tableModel = this.updateTableModel(lineChartData);
        this.isDataAvailable = true;
      },
      error => {
        throw new ApplicationError(error);
      }
    );
  }

  public onChange(newNumberOfDays: number) {
    this.numberOfDays = newNumberOfDays;
    this.service.getTemperature(this.numberOfDays).subscribe(
      lineChartData => {
        this.lineChartData = [];
        lineChartData.forEach(dataElement => {
          this.lineChartData.push(dataElement);
        });
        this.tableModel = this.updateTableModel(lineChartData);
      },
      error => {
        throw new ApplicationError(error);
      }
    );
  }

  public downloadCanvas(eventTarget: HTMLAnchorElement) {
    const anchor = eventTarget;
    anchor.href = this.temperatureChart.nativeElement.toDataURL();
    const filename = 'Temperatura: '; // TODO: Add label names to filename from lineChartData
    anchor.download = filename + '.png';
  }

  updateTableModel(lineChartData): TableModel {
    return {
      columns: ['Datum mjerenja', ...this.lineChartLabels],
      data: this.transformDataToTable(lineChartData)
    };
  }

  transformDataToTable(data: Array<Colors>) {
    return data.map(colors => {
      return {
        date: colors.label,
        data: colors.data
      };
    });
  }
}
