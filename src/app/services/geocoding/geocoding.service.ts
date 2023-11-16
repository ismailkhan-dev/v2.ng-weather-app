import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private API_URL = environment.GEO_API_URL;
  private API_KEY = environment.GEO_API_KEY;
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  getCoordinates(address: string): Observable<any> {
    if (typeof address !== 'string') {
      console.error('Invalid address value');
      return throwError(() => new Error('Invalid address value'));
    }

    const cacheKey = address.toLowerCase();
    const cachedResponse = this.cache.get(cacheKey);
    const url = `${this.API_URL}?address=${encodeURIComponent(address)}&key=${
      this.API_KEY
    }`;

    // Check if the data is already in the cache
    if (this.cache.has(cacheKey)) {
      console.log('Returned GEO cached data');
      return of(cachedResponse);
    }

    return new Observable((observer) => {
      this.http.get(url).subscribe({
        next: (data) => {
          console.log('Received geocoding data', data);

          if (!data) {
            console.error('Received invalid geocoding data');
            observer.error('Invalid geocoding data');
            return;
          }

          this.cache.set(cacheKey, data);
          observer.next(data);
        },
        error: (error) => {
          console.error('Error fetching geocoding data: ', error);
          observer.error(error);
        },
        complete: () => observer.complete(),
      });
    });
  }
}
