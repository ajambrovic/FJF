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

  mapResponseData(responseData) {
    return responseData;
  }

  getTemperature() {
    const urlParameters = new HttpParams()
      .set('originId', '36133')
      .set('numberOfDays', '30')
      .set('enabledDaysInWeek', 'true,true,true,true,true,true,true');
    return this.http.get(
      this.endpointUrl,
      { params: urlParameters }
    ).map(data => this.mapResponseData(data));
  }

  getTemperatureHardcoded() {
    const urlParameters = new HttpParams().set('param-1', 'value-1');
    return this.http.get(
      this.configUrl,
      { params: urlParameters }
    ).map(data => this.mapResponseData(data));
  }

}
