import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Hold the geocode api call data in state

@Injectable({
  providedIn: 'root',
})
export class GeocodingStateService {
  private formattedAddressSubject = new BehaviorSubject<string>('');

  constructor() {}

  setFormattedAddress(address: string): void {
    this.formattedAddressSubject.next(address);
  }

  getFormattedAddress(): Observable<string> {
    return this.formattedAddressSubject.asObservable();
  }
}
