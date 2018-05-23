import { ErrorHandler, Injectable, Injector, ApplicationRef } from '@angular/core';
import { ApplicationError } from './domain/application.error';
import { ToasterService } from 'angular2-toaster';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    appRef: ApplicationRef;
    appNotificationService: ToasterService;


    constructor(
        private injector: Injector
    ) { }

    handleError(detail) {
        if (!this.appNotificationService) {
            this.appRef = this.injector.get(ApplicationRef);
            this.appNotificationService = this.injector.get(ToasterService);
        }
        // either it's an error we made and propagate, like response from the server
        if (detail instanceof ApplicationError) {
            if (detail.errorSummary !== '') {
                this.appNotificationService.popAsync('warning', detail.errorSummary, detail['message']);
            } else {
                this.appNotificationService.popAsync('warning', detail['message']);
            }
        } else {
            // or a general error, e.g. reference error, unless it's a failed promise because server is unavailable, in which case
            // the error message has already been set
            if (!detail.message || detail.message !== 'Uncaught (in promise): Response with status: 0  for URL: null') {
                this.appNotificationService.popAsync('warning', ApplicationError.GENERIC_ERROR_MESSAGE);
            }
            // let the browser handle this
            console.error(detail);
        }

    }

}
