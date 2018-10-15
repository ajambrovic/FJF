import { Injectable } from '@angular/core';
import { ALineChartConfig } from '../app/line-chart/line-chart-config';
import { AGeneralConfig } from '../app/common/domain/general-config';

export const environment = {
  production: true
};

@Injectable()
export class GeneralConfigImpl implements AGeneralConfig {
  production = true;
  homeId = 'ZGM2NzFjNTAtOGFkNy00OGQwLWIwN2ItN2Q5MGI2YmMyNWEz';
  userId = 'MTJlNTMyZWYtYzZmNy00NzUxLThjZTktOGU4YjBiZjg3ZDAx';
  backendUrl = 'http://129.192.69.187/portal-backend/';
  loginEndpoint = 'http://129.192.69.187/login-service/login/caregiver';
  homeStatusEndpoint = this.backendUrl + `homes/${this.homeId}/aggregatedstatus`;
  chartDataEndpoint = this.backendUrl + `users/${this.userId}/chartdata`;
  dateFormat = 'dd.MM.yyyy';
  dateTimeFormat = 'dd.MM.yyyy hh:mm:ss';
  iconsBaseUrl = '/assets/open-iconic/svg';
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
          min: 0, // minimum value
          max: 1, // maximum value
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
  lineChartLabels = [
    '0:00',
    '2:00',
    '4:00',
    '6:00',
    '8:00',
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
    '20:00',
    '22:00',
    '24:00',
  ];
  selectDropdownValues = [
    { value: 20, name: '20' },
    { value: 30, name: '30' },
    { value: 40, name: '40' }
  ];
}
