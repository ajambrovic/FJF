import { HttpErrorResponse } from '@angular/common/http';

export class ApplicationError extends Error {

    public static GENERIC_ERROR_MESSAGE = 'General error. Please contact the administrator';
    item: object;
    errorSummary: string;

    constructor(serverError: HttpErrorResponse, item?: object, message?: string, errorSummary?: string) {
        super();
        this.name = ApplicationError.name;
        this.item = item;
        this.errorSummary = errorSummary || '';
        if (!!serverError && serverError instanceof HttpErrorResponse) {
            const body = serverError.error || '';
            if (serverError.status === 0) {
                this.message = 'Server is unavailable, please try again later.';
            } else if (serverError.status === 401 && body['error'] === 'Unauthorized') {
                this.message = 'Authentication failure. Please login';
            } else if (serverError.status === 401) {
                this.message = 'Wrong username and password combination';
            } else {
                this.message = ApplicationError.GENERIC_ERROR_MESSAGE;
            }
        } else if (!!message) {
            this.message = message;
        } else {
            this.message = ApplicationError.GENERIC_ERROR_MESSAGE;
        }
        Object.setPrototypeOf(this, ApplicationError.prototype);
    }
}
