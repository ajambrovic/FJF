import { TestBed } from '@angular/core/testing';

import { HumiditySensorService } from './humidity-sensor.service';

describe('HumiditySensorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HumiditySensorService = TestBed.get(HumiditySensorService);
    expect(service).toBeTruthy();
  });
});
