import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    randomize(value: any): any {
        return { 'minInDay': value.minInDay, 'value': value.value + Math.random() };
    }

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/login/caregiver') && request.method === 'POST') {
                // find if any user matches login credentials
                const users = [{ username: 'test', password: 'test', id: 1, firstName: 'Test', lastName: 'User' }];
                const filteredUsers = users.filter(user => {
                    return user.username === request.params.get('username') && user.password === request.body;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    const user = filteredUsers[0];
                    const body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };

                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return Observable.throw('Username or password is incorrect');
                }
            }

            if (request.url.endsWith('/aggregatedstatus') && request.method === 'GET') {
                const body = {
                    'homeName': 'SH95886',
                    'homeIsEnabled': true,
                    'homeIsOnline': false,
                    'homeEnvironmentLastUpdated': 1512384685000,
                    'indoorLocationsWithSensorsAndValues': [
                        {
                            'locationName': 'dnevni boravak',
                            'indoorLocationType': 'LIVING_ROOM',
                            'sensorsBooleanValue': [
                                {
                                    'id': 36128,
                                    'sensorName': 'senzor vrata',
                                    'sensorType': 'REED_DOOR',
                                    'timestamp': 1512384685000,
                                    'value': false
                                },
                                {
                                    'id': 36130,
                                    'sensorName': 'senzor pokreta',
                                    'sensorType': 'MOTION',
                                    'timestamp': 1512384685000,
                                    'value': false
                                }
                            ],
                            'sensorsDoubleValue': [
                                {
                                    'id': 36131,
                                    'sensorName': 'senzor vlage',
                                    'sensorType': 'HUMIDITY',
                                    'timestamp': 1512384685000,
                                    'threshold': 1,
                                    'value': 0
                                },
                                {
                                    'id': 36133,
                                    'sensorName': 'senzor temperature',
                                    'sensorType': 'TEMPERATURE',
                                    'timestamp': 1512384685000,
                                    'threshold': 0.1,
                                    'value': 0
                                },
                                {
                                    'id': 36134,
                                    'sensorName': 'senzor osvjetljenja',
                                    'sensorType': 'ILLUMINANCE',
                                    'timestamp': 1512384685000,
                                    'threshold': 5,
                                    'value': 0
                                }
                            ],
                            'sensorsPowerAppliance': [
                                {
                                    'id': 36135,
                                    'sensorName': 'strujni senzor',
                                    'sensorType': 'POWER',
                                    'timestamp': 1512384685000,
                                    'threshold': 2,
                                    'value': 0,
                                    'applianceName': 'TV',
                                    'applianceType': 'TV',
                                    'applianceIsOn': false
                                }
                            ]
                        }
                    ]
                };

                if (request.url.endsWith('/chartdata/value') && request.method === 'GET') {
                    // tslint:disable-next-line:max-line-length
                    const baseValues = [{ minInDay: 1, value: 18.23 }, { minInDay: 30, value: 17.22 }, { minInDay: 59, value: 17.00 }, { minInDay: 79, value: 16.45 }, { minInDay: 92, value: 15.82 }, { minInDay: 120, value: 15.20 }, { minInDay: 155, value: 15.21 }, { minInDay: 170, value: 15.23 }].reverse();
                    const date = new Date();
                    const chartBody = [];
                    for (let i = 0; i < 10; i++) {
                        const datePoint = new Date();
                        date.setDate(date.getDate() - i);
                        const data = {date: datePoint.toUTCString(), dayIndex: i, values: this.randomize(baseValues)};
                        chartBody.push(data);
                    }
                    return Observable.of(new HttpResponse({ status: 200, body: chartBody }));
                }


                return Observable.of(new HttpResponse({ status: 200, body: body }));
            }

            // pass through any requests not handled above
            return next.handle(request);

        })

            // tslint:disable-next-line:max-line-length
            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .materialize()
            .delay(500)
            .dematerialize();
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
/*if (request.url.endsWith('/login/caregiver') && request.method === 'POST') {
                // find if any user matches login credentials
                const filteredUsers = users.filter(user => {
                    return user.username === request.params.get('username') && user.password === request.body;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    const user = filteredUsers[0];
                    const body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };

                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return Observable.throw('Username or password is incorrect');
                }
            }


            if (request.url.endsWith('/aggregatedstatus') && request.method === 'GET') {
                const body = {
                    'homeName': 'SH95886',
                    'homeIsEnabled': true,
                    'homeIsOnline': false,
                    'homeEnvironmentLastUpdated': 1512384685000,
                    'indoorLocationsWithSensorsAndValues': [
                        {
                            'locationName': 'dnevni boravak',
                            'indoorLocationType': 'LIVING_ROOM',
                            'sensorsBooleanValue': [
                                {
                                    'id': 36128,
                                    'sensorName': 'senzor vrata',
                                    'sensorType': 'REED_DOOR',
                                    'timestamp': 1512384685000,
                                    'value': false
                                },
                                {
                                    'id': 36130,
                                    'sensorName': 'senzor pokreta',
                                    'sensorType': 'MOTION',
                                    'timestamp': 1512384685000,
                                    'value': false
                                }
                            ],
                            'sensorsDoubleValue': [
                                {
                                    'id': 36131,
                                    'sensorName': 'senzor vlage',
                                    'sensorType': 'HUMIDITY',
                                    'timestamp': 1512384685000,
                                    'threshold': 1,
                                    'value': 0
                                },
                                {
                                    'id': 36133,
                                    'sensorName': 'senzor temperature',
                                    'sensorType': 'TEMPERATURE',
                                    'timestamp': 1512384685000,
                                    'threshold': 0.1,
                                    'value': 0
                                },
                                {
                                    'id': 36134,
                                    'sensorName': 'senzor osvjetljenja',
                                    'sensorType': 'ILLUMINANCE',
                                    'timestamp': 1512384685000,
                                    'threshold': 5,
                                    'value': 0
                                }
                            ],
                            'sensorsPowerAppliance': [
                                {
                                    'id': 36135,
                                    'sensorName': 'strujni senzor',
                                    'sensorType': 'POWER',
                                    'timestamp': 1512384685000,
                                    'threshold': 2,
                                    'value': 0,
                                    'applianceName': 'TV',
                                    'applianceType': 'TV',
                                    'applianceIsOn': false
                                }
                            ]
                        }
                    ]
                };


                return Observable.of(new HttpResponse({ status: 200, body: body }));
            }

            if (request.url.endsWith('/chartdata/value') && request.method === 'GET') {
                // tslint:disable-next-line:max-line-length
                const baseValues = [{ minInDay: 1, value: 18.23 }, { minInDay: 30, value: 17.22 }, { minInDay: 59, value: 17.00 }, { minInDay: 79, value: 16.45 }, { minInDay: 92, value: 15.82 }, { minInDay: 120, value: 15.20 }, { minInDay: 155, value: 15.21 }, { minInDay: 170, value: 15.23 }].reverse();
                const date = new Date();
                const body = [];
                return Observable.of(new HttpResponse({ status: 200, body: body }));
            }*/
