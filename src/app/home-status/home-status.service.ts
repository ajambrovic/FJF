import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HomeEnvironment } from './domain/home-environment.model';
import { Sensor } from './domain/sensor.model';
import { Location } from './domain/location.model';

enum SensorType {
    REED_DOOR = 'REED_DOOR',
    HUMIDITY = 'HUMIDITY',
    TEMPERATURE = 'TEMPERATURE',
    ILLUMINANCE = 'ILLUMINANCE',
    POWER = 'POWER',
    MOTION = 'MOTION'
}

@Injectable()
export class HomeStatusService {


    constructor(private http: HttpClient) { }


    getHomeStatus() {

        // TODO homeId from environment config?
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
        const baseUrl = '/assets/open-iconic/svg';
        switch (sensor.sensorType) {
            case (SensorType.REED_DOOR):
                return { iconUrl: `${baseUrl}/bell.svg`, iconText: 'door' };
            case (SensorType.HUMIDITY):
                return { iconUrl: `${baseUrl}/droplet.svg`, iconText: 'humidity' };
            case (SensorType.TEMPERATURE):
                return { iconUrl: `${baseUrl}/badge.svg`, iconText: 'temperature' };
            case (SensorType.ILLUMINANCE):
                return { iconUrl: `${baseUrl}/sun.svg`, iconText: 'illuminance' };
            case (SensorType.POWER):
                return { iconUrl: `${baseUrl}/lightbulb.svg`, iconText: 'power' };
            case (SensorType.MOTION):
                return { iconUrl: `${baseUrl}/audio.svg`, iconText: 'sensor' };
            default:
                return { iconUrl: `${baseUrl}/infinity.svg`, iconText: 'sensor' };
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
            case (SensorType.REED_DOOR):
                return this.getDoorSensorValue(sensor.value);
            case (SensorType.HUMIDITY):
                return this.getHumiditySensorValue(sensor.value);
            case (SensorType.TEMPERATURE):
                return this.getTemperatureSensorValue(sensor.value);
            case (SensorType.ILLUMINANCE):
                return this.getIlluminanceSensorValue(sensor.value);
            case (SensorType.POWER):
                return this.getPowerSensorValue(sensor);
            case (SensorType.MOTION):
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
