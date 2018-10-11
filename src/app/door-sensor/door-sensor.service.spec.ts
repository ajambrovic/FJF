import { TestBed, inject } from '@angular/core/testing';

import { DoorSensorService } from './door-sensor.service';

describe('DoorSensorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoorSensorService]
    });
  });

  it('should be created', inject([DoorSensorService], (service: DoorSensorService) => {
    expect(service).toBeTruthy();
  }));
});
