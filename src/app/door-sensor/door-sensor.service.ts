import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AGeneralConfig } from '../common/domain/general-config';
import { DatePipe } from '@angular/common';
import { Colors } from 'ng2-charts';

@Injectable()
export class DoorSensorService {
  configUrl = 'assets/door-mock-data.json';

  constructor(
    private config: AGeneralConfig,
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  getDoorSensorData(numberOfDays: number) {
    return this.http.get(
      this.configUrl
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
    responseValues.intervals.forEach(interval => {
      const formattedValue = (!!interval.value) ? interval.weight * 30 : 10;
      lineChartMeasure.data.push(formattedValue);
    });
    return lineChartMeasure;
  }
}
