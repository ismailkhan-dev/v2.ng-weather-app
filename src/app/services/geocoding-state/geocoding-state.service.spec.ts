import { TestBed } from '@angular/core/testing';

import { GeocodingStateService } from './geocoding-state.service';

describe('GeocodingStateService', () => {
  let service: GeocodingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeocodingStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
