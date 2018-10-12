import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AGeneralConfig } from '../common/domain/general-config';
import { DatePipe } from '@angular/common';
import { Colors } from 'ng2-charts';
import { map } from 'rxjs/operators';

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
    ).pipe(map((data: DoorChartDataResponse) =>
      this.mapResponseData(data)));
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
      data: new Array(12)
    };
    const emptyValue = 0;
    lineChartMeasure.data.fill(emptyValue);
    lineChartMeasure.data = lineChartMeasure.data.map((dataValue, dataValueIndex) => {
      const intervalFromServerResponse = responseValues.intervals.find(interval => interval.index === dataValueIndex);
      let formattedValue = emptyValue;
      if (!!intervalFromServerResponse && !!intervalFromServerResponse.value) {
        formattedValue = intervalFromServerResponse.weight;
      }
      return formattedValue;
    });

    return lineChartMeasure;
  }
}
