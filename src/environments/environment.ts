import { Injectable } from '@angular/core';
import { AGeneralConfig } from '../app/domain/general-config';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};

@Injectable()
export class GeneralConfigImpl implements AGeneralConfig {
  production = false;
  homeId = 'NGViYWZkMmQtYzI4YS00YTlmLWExYmQtN2YyMWUyYzRhODM5';
  backendUrl = 'https://portal.smarthabits.io/portal-backend/';
  loginEndpoint = 'https://portal.smarthabits.io/login-service/login/caregiver';
  chartDataEndpoint = this.backendUrl + `users/${this.homeId}/chartdata/value`;
  dateFormat = 'dd.MM.yyyy';
  dateTimeFormat = 'dd.MM.yyyy hh:mm:ss';
}
