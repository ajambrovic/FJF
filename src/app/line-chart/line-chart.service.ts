import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AGeneralConfig } from '../common/domain/general-config';
import { Colors } from 'ng2-charts';



@Injectable()
export class LineChartService {
  originId = '31850';
  configURL = 'assets/temperature-mock-data.json';
  endpointURL = `${this.config.chartDataEndpoint}/value`;

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
      const formattedValue = value.value;
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

  getTemperature(numberOfDays: number) {
    const urlParameters = new HttpParams().set('originId', this.originId)
      .set('numberOfDays', '' + numberOfDays)
      .set('enabledDaysInWeek', 'true,true,true,true,true,true,true');
    const getRequestOptions = { params: urlParameters };
    return this.http.get(
      this.endpointURL,
      getRequestOptions
    ).pipe(map((data: TemperatureChartDataResponse) =>
      this.mapResponseData(data)));
  }

}
