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

    constructor() { }

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
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!!user) {
            return user.token;
        }
    }
}
