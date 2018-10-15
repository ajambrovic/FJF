import { DoorSensorModule } from './door-sensor.module';

describe('DoorSensorModule', () => {
  let doorSensorModule: DoorSensorModule;

  beforeEach(() => {
    doorSensorModule = new DoorSensorModule();
  });

  it('should create an instance', () => {
    expect(doorSensorModule).toBeTruthy();
  });
});
