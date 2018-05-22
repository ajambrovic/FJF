import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AGeneralConfig } from '../../domain/general-config';

@Injectable()
export class AuthenticationService {
    private static readonly USER_KEY = 'currentUser';
    constructor(private config: AGeneralConfig, private http: HttpClient) { }

    login(username: string, password: string) {
        const url = this.config.loginEndpoint;
        const params = { username: username };
        return this.http.post<any>(url, password, { params: params })
            .map(user => {
                // login successful if there's a user in the response
                if (!!user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(AuthenticationService.USER_KEY, JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(AuthenticationService.USER_KEY);
    }

    isLoggedIn() {
        return !!this.getLoggedInUser();
    }

    getLoggedInUser() {
        return JSON.parse(localStorage.getItem(AuthenticationService.USER_KEY));
    }

}
