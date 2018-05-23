import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AGeneralConfig } from '../common/domain/general-config';
import { Colors } from 'ng2-charts';



@Injectable()
export class LineChartService {
  configUrl = 'assets/config.json';
  endpointUrl = this.config.chartDataEndpoint;

  constructor(
    private config: AGeneralConfig,
    private http: HttpClient
  ) { }

  transformToLineChartData(responseValues: any) {
    const lineChartMeasure: Colors = {
      label: responseValues.label,
      data: responseValues.data
    };
    return lineChartMeasure;
  }

  mapResponseData(responseData: ChartDataResponse): Array<Colors> {
    const lineChartData = [];
    responseData.forEach(responseValues => {
      const transformedData = this.transformToLineChartData(responseValues);
      if (!!transformedData) {
        lineChartData.push(transformedData);
      }
    });

    return lineChartData;
  }

  getTemperature(numberOfDays: number) {
    const urlParameters = new HttpParams()
      .set('enabledDaysInWeek', 'true,true,true,true,true,true,true');
    return this.http.get(
      this.configUrl,
      { params: urlParameters }
    ).map((data: ChartDataResponse) =>
      this.mapResponseData(data));
  }

}
