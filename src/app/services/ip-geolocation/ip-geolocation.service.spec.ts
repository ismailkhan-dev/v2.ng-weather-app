import { TestBed } from '@angular/core/testing';

import { IpGeolocationService } from './ip-geolocation.service';

describe('IpGeolocationService', () => {
  let service: IpGeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpGeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
