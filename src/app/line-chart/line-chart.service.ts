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
    const responseValues = responseData[0].values;
    const lineChartLabels = [];
    const lineChartData = [
      {
        'label': 'Temperatura',
        'data': []
      }
    ];
    responseValues.forEach(value => {
      const hours = Math.floor(value.minInDay / 60);
      let hoursOutput = '' + hours;
      const minutes = value.minInDay % 60;
      let minutesOutput = '' + minutes;
      if (hours < 10) { hoursOutput = '0' + hours; }
      if (minutes < 10) { minutesOutput = '0' + minutes; }
      lineChartLabels.push(hoursOutput + ':' + minutesOutput);
      lineChartData[0].data.push(value.value.toFixed(2));
    });
    return { lineChartLabels, lineChartData };
  }

  getTemperature() {
    const urlParameters = new HttpParams()
      .set('originId', '36133')
      .set('numberOfDays', '30')
      .set('enabledDaysInWeek', 'true,true,true,true,true,true,true');
    return this.http.get(
      this.endpointUrl,
      { params: urlParameters }
    ).map((data: ChartDataResponse) =>
      this.mapResponseData(data));
  }

  getTemperatureHardcoded() {
    const urlParameters = new HttpParams().set('param-1', 'value-1');
    return this.http.get(
      this.configUrl,
      { params: urlParameters }
    ).map((data: ChartDataResponse) =>
      this.mapResponseData(data));
  }

}
