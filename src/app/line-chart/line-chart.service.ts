import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class LineChartService {
  configUrl = 'assets/config.json';
  endpointUrl = 'https://portal.smarthabits.io/portal-backend/users/NGViYWZkMmQtYzI4YS00YTlmLWExYmQtN2YyMWUyYzRhODM5/chartdata/value';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  transformToLineChartData(responseValues: any) {
    if (responseValues.values.length < 13) {
      return;
    }
    const lineChartMeasure = {
      'label': this.datePipe.transform(responseValues.date, 'dd.MM.yyyy'),
      'data': []
    };
    responseValues.values.forEach(value => {
      lineChartMeasure.data.push(value.value.toFixed(2));
    });
    return lineChartMeasure;
  }

  mapResponseData(responseData: ChartDataResponse) {
    // to config
    const lineChartLabels = [
      '0:00',
      '2:00',
      '4:00',
      '6:00',
      '8:00',
      '10:00',
      '12:00',
      '14:00',
      '16:00',
      '18:00',
      '20:00',
      '22:00',
      '24:00',
    ];
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

    return { lineChartLabels, lineChartData };
  }

  getTemperature(numberOfDays: number) {
    const urlParameters = new HttpParams()
      .set('originId', '36133')
      .set('numberOfDays', '' + numberOfDays)
      .set('enabledDaysInWeek', 'true,true,true,true,true,true,true');
    return this.http.get(
      this.endpointUrl,
      { params: urlParameters }
    ).map((data: ChartDataResponse) =>
      this.mapResponseData(data));
  }

  getTemperatureHardcoded(numberOfDays: number) {
    const urlParameters = new HttpParams().set('param-1', 'value-1');
    return this.http.get(
      this.configUrl,
      { params: urlParameters }
    ).map((data: ChartDataResponse) =>
      this.mapResponseData(data));
  }

}
