import { HttpErrorResponse } from '@angular/common/http';

export class ApplicationError extends Error {

    public static GENERIC_ERROR_MESSAGE = 'Pogreška u sustavu, molimo kontaktirajte administratora sustava.';
    item: object;
    errorSummary: string;

    constructor(
        serverError: HttpErrorResponse,
        item?: object,
        message?: string,
        errorSummary?: string
    ) {
        super();
        this.name = ApplicationError.name;
        this.item = item;
        this.errorSummary = errorSummary || '';
        if (!!serverError && serverError instanceof HttpErrorResponse) {
            const body = serverError.error || '';
            if (serverError.status === 0) {
                this.message = 'Poslužitelj je nedostupan, molimo pokušajte ponovo kasnije.';
            } else if (serverError.status === 401 && body['error'] === 'Unauthorized') {
                this.message = 'Autorizacijska pogreška, molimo ulogirajte se u aplikaciju.';
            } else if (serverError.status === 401) {
                this.message = 'Neispravna kombinacija korisničkog imena i lozinke';
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
