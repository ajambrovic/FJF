import { Sensor } from './sensor.model';

export class Location {
    constructor(
        public locationName: string,
        public indoorLocationType: string,
        public sensorsBooleanValue: Array<Sensor>,
        public sensorsDoubleValue: Array<Sensor>,
        public sensorsPowerAppliance: Array<Sensor>
    ) { }

    public sensorValues: Array<Sensor>;
}
