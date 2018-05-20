import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class LineChartService {
  configUrl = 'assets/config.json';
  endpointUrl = 'https://portal.smarthabits.io/portal-backend/users/NGViYWZkMmQtYzI4YS00YTlmLWExYmQtN2YyMWUyYzRhODM5/chartdata/value';

  constructor(private http: HttpClient) { }


  mapResponseData(responseData: ChartDataResponse) {
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
    responseData.forEach(responseValues => {
      const lineChartMeasure = {
        'label': responseValues.date,
        'data': []
      };
      responseValues.values.forEach(value => {
        const hours = Math.floor(value.minInDay / 60);
        const minutes = value.minInDay % 60;
        lineChartMeasure.data.push(value.value.toFixed(2));
      });
      lineChartData.push(lineChartMeasure);
    });
    lineChartData.sort(function (a, b) {
      return -(new Date(a.label).getTime() - new Date(b.label).getTime());
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
