import { Injectable } from '@angular/core';
import { AGeneralConfig } from '../app/domain/general-config';
import { ALineChartConfig } from '../app/line-chart/line-chart-config';

export const environment = {
  production: false
};

@Injectable()
export class GeneralConfigImpl implements AGeneralConfig {
  homeId = 'NGViYWZkMmQtYzI4YS00YTlmLWExYmQtN2YyMWUyYzRhODM5';
  backendUrl = 'https://portal.smarthabits.io/portal-backend/';
  loginEndpoint = 'https://portal.smarthabits.io/login-service/login/caregiver';
  chartDataEndpoint = this.backendUrl + `users/${this.homeId}/chartdata/value`;
  dateFormat = 'dd.MM.yyyy';
  dateTimeFormat = 'dd.MM.yyyy hh:mm:ss';
}

@Injectable()
export class LineChartComponentConfigImpl implements ALineChartConfig {
  lineChartType = 'line';
  defaultNumberOfDays = 30;
  lineChartOptions: any = {
    responsive: true,
    legend: {
      position: 'top',
    },
    scales: {
      yAxes: [{
        // scale label
        scaleLabel: {
          // display property
          display: true,
          // actual label
          labelString: 'Temperatura',
          fontSize: 30,
        },
        ticks: {
          min: 10, // minimum value
          max: 30, // maximum value
        }
      }],
      xAxes: [{
        // scale label
        scaleLabel: {
          // display property
          display: true,

          // actual label
          labelString: 'Doba dana',
          fontSize: 30,
        },
      }]
    }
  };
  lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  selectDropdownValues = [
    { value: 20, name: '20' },
    { value: 30, name: '30' },
    { value: 40, name: '40' }
  ];
}
