import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AGeneralConfig } from '../common/domain/general-config';
import { Colors } from 'ng2-charts';



@Injectable()
export class LineChartService {
  originId = '31850';
  configUrl = 'assets/temperature-mock-data.json';
  endpointUrl = `${this.config.chartDataEndpoint}/value`;

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
      const formattedValue = value.value.toFixed(2);
      lineChartMeasure.data.push(formattedValue);
    });
    return lineChartMeasure;
  }

  mapResponseData(responseData: TemperatureChartDataResponse): Array<Colors> {
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
      .set('originId', this.originId)
      .set('numberOfDays', '' + numberOfDays)
      .set('enabledDaysInWeek', 'true,true,true,true,true,true,true');
    return this.http.get(
      this.configUrl,
      { params: urlParameters }
    ).pipe(map((data: TemperatureChartDataResponse) =>
      this.mapResponseData(data)));

  }

}
