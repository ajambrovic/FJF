import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AGeneralConfig } from '../common/domain/general-config';
import { Colors } from 'ng2-charts';



@Injectable()
export class LineChartService {
  originId = '31850';
  mockDataURL = 'assets/temperature-mock-data.json';
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
    // const getRequestOptions = { params: urlParameters };
    const getRequestOptions = {};
    return this.http.get(
      this.mockDataURL,
      getRequestOptions
    ).pipe(map((data: TemperatureChartDataResponse) =>
      this.mapResponseData(data)));
  }

}
