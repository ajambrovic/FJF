import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    // tslint:disable-next-line:max-line-length
    private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1lTVEVNIiwiZXhwIjo0NjgxMzYwODI0LCJzdWIiOiJwb3J0YWwtYmFja2VuZCJ9.tbX-WBmBBiXAZPvw0fv-A4SPtQqRsRXy93TzQPEzA_o';
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                'x-auth-token': this.token
            }
        });

        return next.handle(request);
    }
}
