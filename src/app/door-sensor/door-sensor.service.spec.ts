import { TestBed } from '@angular/core/testing';

import { DoorSensorService } from './door-sensor.service';

describe('DoorSensorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoorSensorService = TestBed.get(DoorSensorService);
    expect(service).toBeTruthy();
  });
});
