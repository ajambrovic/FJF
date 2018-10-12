import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthenticationService } from '../login/services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthenticationService
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
        const user = this.authService.getLoggedInUser();
        if (!!user) {
            return user.token;
        }
    }
}
