import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrowserGeolocationService {
  constructor() {}

  public getCurrentPosition(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      if (!navigator.geolocation) {
        observer.error(
          'Browser geolocation API is not supported by the browser',
        );
        return;
      }

      const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 10000,
      };

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          observer.next(position);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        },
        options,
      );

      return {
        unsubscribe() {
          navigator.geolocation.clearWatch(watchId);
        },
      };
    });
  }
}
