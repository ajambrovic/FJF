import { HumiditySensorModule } from './humidity-sensor.module';

describe('HumiditySensorModule', () => {
  let humiditySensorModule: HumiditySensorModule;

  beforeEach(() => {
    humiditySensorModule = new HumiditySensorModule();
  });

  it('should create an instance', () => {
    expect(humiditySensorModule).toBeTruthy();
  });
});
