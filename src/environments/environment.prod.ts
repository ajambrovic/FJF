import { Injectable } from '@angular/core';
import { AGeneralConfig } from '../app/domain/general-config';

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
