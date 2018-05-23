export class Sensor {

    iconText: string;
    iconUrl: string;
    dateTime: string;
    dateTimeIconUrl: string;
    dateTimeIconText: string;

    constructor(
        public sensorName: string,
        public sensorType: string,
        public timestamp: number,
        public value: any,
        public threshold?: any,
        public applianceName?: string,
        public applianceType?: string,
        public applianceIsOn?: boolean
    ) { }
}
