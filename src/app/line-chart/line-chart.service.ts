import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class LineChartService {
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  mapResponseData(responseData) {
    return responseData;
  }

  getTemperature() {
    const urlParameters = new HttpParams().set('param-1', 'value-1');
    return this.http.get(
      this.configUrl,
      { params: urlParameters }
    ).map(data => this.mapResponseData(data));
  }
}
