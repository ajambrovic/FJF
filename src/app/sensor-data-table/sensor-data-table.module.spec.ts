import { SensorDataTableModule } from './sensor-data-table.module';

describe('SensorDataTableModule', () => {
  let sensorDataTableModule: SensorDataTableModule;

  beforeEach(() => {
    sensorDataTableModule = new SensorDataTableModule();
  });

  it('should create an instance', () => {
    expect(sensorDataTableModule).toBeTruthy();
  });
});
