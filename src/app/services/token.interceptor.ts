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

    constructor(
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.getToken();
        if (!!token) {
            request = request.clone({
                setHeaders: {
                    'X-Auth-Token': token
                }
            });
        }

        return next.handle(request);
    }

    private getToken() {
        /*const user = this.authService.getLoggedInUser();
        if (!!user) {
            return user.token;
        }*/
        // tslint:disable-next-line:max-line-length
        return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1lTVEVNIiwiZXhwIjo0NjgxMzYwODI0LCJzdWIiOiJwb3J0YWwtYmFja2VuZCJ9.tbX-WBmBBiXAZPvw0fv-A4SPtQqRsRXy93TzQPEzA_o';
    }
}
