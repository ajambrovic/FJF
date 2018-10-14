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
    // TODO: fill missing values by filling creating an array filled with empty values
    // and then map that array to indexes in values of responseValues
    responseValues.values.forEach(value => {
      // TODO: get formatted value and add it to lineChartMeasure data
    });
    return lineChartMeasure;
  }

  mapResponseData(responseData: TemperatureChartDataResponse): Array<Colors> {
    const lineChartData = [];
    // TODO: Implement sort of responseData by Time
    responseData.forEach(responseValues => {
      const transformedData = this.transformToLineChartData(responseValues);
      if (!!transformedData) {
        lineChartData.push(transformedData);
      }
    });

    return lineChartData;
  }

  getTemperature(numberOfDays: number) {
    const urlParameters = new HttpParams();
    return this.http.get(
      this.configUrl,
      { params: urlParameters }
    ).pipe(map((data: TemperatureChartDataResponse) =>
      this.mapResponseData(data)));
  }

}
