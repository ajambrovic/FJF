import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
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
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  transformToLineChartData(responseValues: any) {
    const lineChartMeasure: Colors = {
      label: this.datePipe.transform(responseValues.date, this.config.dateFormat),
      data: []
    };
    responseValues.values.forEach(value => {
      lineChartMeasure.data.push(value.value.toFixed(2));
    });
    return lineChartMeasure;
  }

  mapResponseData(responseData: ChartDataResponse): Array<Colors> {
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

  getTemperature(numberOfDays: number) {
    const urlParameters = new HttpParams()
      .set('originId', '31850')
      .set('numberOfDays', '' + numberOfDays)
      .set('enabledDaysInWeek', 'true,true,true,true,true,true,true');
    return this.http.get(
      this.endpointUrl,
      { params: urlParameters }
    ).map((data: ChartDataResponse) =>
      this.mapResponseData(data));
  }

}
