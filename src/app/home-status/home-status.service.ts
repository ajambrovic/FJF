import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HomeEnvironment } from './domain/home-environment.model';
import { Sensor } from './domain/sensor.model';
import { Location } from './domain/location.model';
import { AGeneralConfig } from '../common/domain/general-config';


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

    constructor(
        private config: AGeneralConfig,
        private http: HttpClient,
        private datePipe: DatePipe
    ) { }

    getHomeStatus() {
        const url = this.config.homeStatusEndpoint;

        return this.http.get<HomeEnvironment>(url)
            .pipe(map(homeEnvironment => {
                return this.mapHomeEnviroment(homeEnvironment);
            }));
    }

    mapHomeEnviroment(homeEnvironment: HomeEnvironment): HomeEnvironment {
        homeEnvironment.indoorLocationsWithSensorsAndValues.forEach(location => {
            location.sensorValues = this.getSensorValues(location);
            location.sensorValues.forEach(sensor => {
                const sensorInfo = this.getSensorInfo(sensor);
                sensor.iconUrl = sensorInfo.iconUrl;
                sensor.iconText = sensorInfo.iconText;
                sensor.dateTime = this.getFormattedTimestamp(sensor.timestamp);
                sensor.dateTimeIconUrl = `${this.config.iconsBaseUrl}/clock.svg`;
                sensor.dateTimeIconText = 'vrijeme';
            });
        });

        return homeEnvironment;
    }

    getSensorInfo(sensor: Sensor) {
        switch (sensor.sensorType) {
            case (SensorType.REED_DOOR):
                return { iconUrl: `${this.config.iconsBaseUrl}/bell.svg`, iconText: 'vrata' };
            case (SensorType.HUMIDITY):
                return { iconUrl: `${this.config.iconsBaseUrl}/droplet.svg`, iconText: 'vlažnost zraka' };
            case (SensorType.TEMPERATURE):
                return { iconUrl: `${this.config.iconsBaseUrl}/badge.svg`, iconText: 'temperatura' };
            case (SensorType.ILLUMINANCE):
                return { iconUrl: `${this.config.iconsBaseUrl}/sun.svg`, iconText: 'osvjetljenje' };
            case (SensorType.POWER):
                return { iconUrl: `${this.config.iconsBaseUrl}/lightbulb.svg`, iconText: 'potrošnja struje' };
            case (SensorType.MOTION):
                return { iconUrl: `${this.config.iconsBaseUrl}/audio.svg`, iconText: 'pokret' };
            default:
                return { iconUrl: `${this.config.iconsBaseUrl}/infinity.svg`, iconText: 'senzor' };
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
            return 'otvoreno';
        } else {
            return 'zatvoreno';
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
            return 'upaljeno';
        }
        return 'ugašeno';
    }

    getMotionSensorValue(value: any): any {
        if (value === true || value === 'true') {
            return 'kretanje detektirano';
        } else {
            return 'nema pokreta u proteklih 60 min';
        }
    }

    getFormattedTimestamp(timestamp: number) {
        return this.datePipe.transform(timestamp, this.config.dateTimeFormat);
    }
}
