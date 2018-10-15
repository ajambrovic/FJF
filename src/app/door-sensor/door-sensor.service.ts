import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AGeneralConfig } from '../common/domain/general-config';
import { Colors } from 'ng2-charts';

@Injectable({
  providedIn: 'root'
})
export class DoorSensorService {

  // originId = '31850';
  mockDataURL = 'assets/door-mock-data.json';
  // endpointURL = `${this.config.chartDataEndpoint}/value`;

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
    responseValues.intervals.forEach(interval => {
      let formattedValue = emptyValue;
      if (interval.value === true) {
        formattedValue = interval.value.weight;
      }
      lineChartMeasure.data.push(formattedValue);
    });
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
    /*const urlParameters = new HttpParams()
      .set('originId', this.originId)
      .set('numberOfDays', '' + numberOfDays)
      .set('enabledDaysInWeek', 'true,true,true,true,true,true,true');
    const getRequestOptions = { params: urlParameters };*/
    return this.http.get(
      this.mockDataURL,
      // getRequestOptions
    ).pipe(map((data: TemperatureChartDataResponse) =>
      this.mapResponseData(data)));
  }
}
