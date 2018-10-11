import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AGeneralConfig } from '../common/domain/general-config';
import { DatePipe } from '@angular/common';
import { Colors } from 'ng2-charts';

@Injectable()
export class DoorSensorService {
  originId = '31973';
  configUrl = 'assets/door-mock-data.json';
  endpointUrl = `${this.config.chartDataEndpoint}/reedopen`;

  constructor(
    private config: AGeneralConfig,
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  getDoorSensorData(numberOfDays: number) {
    const urlParameters = new HttpParams()
      .set('originId', this.originId)
      .set('numberOfDays', '' + numberOfDays)
      .set('intervalDurationMin', '120')
      .set('enabledDaysInWeek', 'true,true,true,true,true,true,true');
    return this.http.get(
      this.endpointUrl,
      { params: urlParameters }
    ).map((data: DoorChartDataResponse) =>
      this.mapResponseData(data));
  }

  mapResponseData(responseData: DoorChartDataResponse): Array<Colors> {
    // to config
    const lineChartData = [];
    responseData.sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    responseData.forEach(responseValues => {
      const transformedData = this.transformToLineChartData(responseValues);
      if (!!transformedData) {
        lineChartData.push(transformedData);
      }
    });

    return lineChartData;
  }

  transformToLineChartData(responseValues: any) {
    const lineChartMeasure: Colors = {
      label: this.datePipe.transform(responseValues.date, this.config.dateFormat),
      data: []
    };
    responseValues.intervals.forEach((interval, index) => {
      if (interval.index === index) {
        const formattedValue = (!!interval.value) ? interval.weight * 30 : 11;
        lineChartMeasure.data.push(formattedValue);
      } else {
        const formattedValue = 11;
        lineChartMeasure.data.push(formattedValue);
        index--;
      }

    });
    while (lineChartMeasure.data.length < 12) {
      const formattedValue = 11;
      lineChartMeasure.data.push(formattedValue);
    }
    return lineChartMeasure;
  }
}
