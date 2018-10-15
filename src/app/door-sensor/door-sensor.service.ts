import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AGeneralConfig } from '../common/domain/general-config';
import { Colors } from 'ng2-charts';

@Injectable({
  providedIn: 'root'
})
export class DoorSensorService {

  originId = '31973';
  intervalDurationMin = '120';
  mockDataURL = 'assets/door-mock-data.json';
  endpointURL = `${this.config.chartDataEndpoint}/reedopen`;

  constructor(
    private config: AGeneralConfig,
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  transformToLineChartData(responseValues: any) {
    const lineChartMeasure: Colors = {
      label: this.datePipe.transform(responseValues.date, this.config.dateFormat),
      data: []
    };
    const emptyValue = 0;
    const resultValues = new Array(12);
    resultValues.fill(emptyValue);
    responseValues.intervals.forEach(interval => {
      if (interval.value === true) {
        const formattedValue = interval.weight.toFixed(4);
        resultValues[interval.index] = formattedValue;
      }
    });
    lineChartMeasure.data = resultValues;
    return lineChartMeasure;
  }

  mapResponseData(responseData: TemperatureChartDataResponse): Array<Colors> {
    const lineChartData = [];
    responseData.forEach(responseValues => {
      const transformedData = this.transformToLineChartData(responseValues);
      if (!!transformedData) {
        lineChartData.push(transformedData);
      }
    });

    return lineChartData;
  }

  getDoorSensorData(numberOfDays: number) {
    const urlParameters = new HttpParams()
      .set('originId', this.originId)
      .set('numberOfDays', '' + numberOfDays)
      .set('intervalDurationMin', '' + this.intervalDurationMin)
      .set('enabledDaysInWeek', 'true,true,true,true,true,true,true');
    const getRequestOptions = { params: urlParameters };
    return this.http.get(
      this.endpointURL,
      getRequestOptions
    ).pipe(map((data: TemperatureChartDataResponse) =>
      this.mapResponseData(data)));
  }
}
