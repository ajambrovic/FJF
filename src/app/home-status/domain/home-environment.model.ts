import { Location } from './location.model';

export class HomeEnvironment {
    constructor(
        public homeName: string,
        public homeIsEnabled: boolean,
        public homeIsOnline: boolean,
        public homeEnvironmentLastUpdated: number,
        public indoorLocationsWithSensorsAndValues: Array<Location>,
    ) { }
}
