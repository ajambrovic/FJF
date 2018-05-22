import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HomeEnvironment } from './domain/home-environment.model';
import { Sensor } from './domain/sensor.model';
import { Location } from './domain/location.model';

@Injectable()
export class HomeStatusService {
    constructor(private http: HttpClient) { }

    getHomeStatus() {

        // TODO homeId from somewhere else?
        const homeId = 'MTFjM2IyYTQtZGRmZi00YTI4LWI3YWEtYmQyMjlmZTUwNGEw';

        return this.http.get<HomeEnvironment>(`https://portal.smarthabits.io/portal-backend/homes/${homeId}/aggregatedstatus`)
            .map(homeEnvironment => {
                return this.mapHomeEnviroment(homeEnvironment);
            });
    }

    mapHomeEnviroment(homeEnvironment: HomeEnvironment): HomeEnvironment {
        homeEnvironment.indoorLocationsWithSensorsAndValues.forEach(location => {
            location.sensorValues = this.getSensorValues(location);
            location.sensorValues.forEach(sensor => {
                const sensorInfo = this.getSensorInfo(sensor);
                sensor.iconUrl = sensorInfo.iconUrl;
                sensor.iconText = sensorInfo.iconText;
                sensor.dateTime = this.getFormattedTimestamp(sensor.timestamp);
            });
        });

        return homeEnvironment;
    }

    getSensorInfo(sensor: Sensor) {
        switch (sensor.sensorType) {
            case ('REED_DOOR'):
                return { iconUrl: '/assets/open-iconic/svg/bell.svg', iconText: 'door' };
            case ('HUMIDITY'):
                return { iconUrl: '/assets/open-iconic/svg/droplet.svg', iconText: 'humidity' };
            case ('TEMPERATURE'):
                return { iconUrl: '/assets/open-iconic/svg/badge.svg', iconText: 'temperature' };
            case ('ILLUMINANCE'):
                return { iconUrl: '/assets/open-iconic/svg/sun.svg', iconText: 'illuminance' };
            case ('POWER'):
                return { iconUrl: '/assets/open-iconic/svg/lightbulb.svg', iconText: 'power' };
            default:
                return { iconUrl: '/assets/open-iconic/svg/audio.svg', iconText: 'sensor' };
        }
    }

    getSensorValues(location: Location) {
        const sensorValues: Array<Sensor> = []
            .concat(location.sensorsBooleanValue)
            .concat(location.sensorsDoubleValue)
            .concat(location.sensorsPowerAppliance);
        sensorValues.forEach(sensor => {
            sensor.value = this.getFormattedValue(sensor);
        });
        return sensorValues;
    }

    getFormattedValue(sensor: Sensor) {
        switch (sensor.sensorType) {
            case ('REED_DOOR'):
                return this.getDoorSensorValue(sensor.value);
            case ('HUMIDITY'):
                return this.getHumiditySensorValue(sensor.value);
            case ('TEMPERATURE'):
                return this.getTemperatureSensorValue(sensor.value);
            case ('ILLUMINANCE'):
                return this.getIlluminanceSensorValue(sensor.value);
            case ('POWER'):
                return this.getPowerSensorValue(sensor);
            case ('MOTION'):
                return this.getMotionSensorValue(sensor.value);
            default:
                return sensor.value;
        }
    }

    getDoorSensorValue(value) {
        if (value === true || value === 'true') {
            return 'open';
        } else {
            return 'closed';
        }
    }

    getHumiditySensorValue(value: any): any {
        return value + ' % ';
    }

    getTemperatureSensorValue(value: any): any {
        return value + ' °C ';
    }

    getIlluminanceSensorValue(value: any): any {
        return value + ' lx';
    }

    getPowerSensorValue(sensor: Sensor): any {
        if (sensor.value > sensor.threshold) {
            return 'on';
        }
        return 'off';
    }

    getMotionSensorValue(value: any): any {
        if (value === true || value === 'true') {
            return 'movement detected';
        } else {
            return 'no movement past 60 min';
        }
    }

    getFormattedTimestamp(timestamp: number) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }
}
