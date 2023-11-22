import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private API_KEY = environment.WEATHER_API_KEY;
  private API_URL = environment.WEATHER_API_URL;
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  getWeatherData(lat: number, long: number): Observable<any> {
    if (typeof lat !== 'number' || typeof long !== 'number') {
      console.error('Invalid lat and long values');
      return throwError(() => new Error('Invalid lat and long values'));
    }

    const url = `${this.API_URL}?lat=${lat}&lon=${long}&units=metric&appid=${this.API_KEY}`;
    const cacheKey = `weather-data-${lat}-${long}`;
    const cachedResponse = this.cache.get(cacheKey);

    // Check if the data is already in the cache
    if (this.cache.has(cacheKey)) {
      console.log('Returned WEATHER cached data');
      return of(cachedResponse);
    }

    // console.log('Fetched new WEATHER data: ', url);

    return new Observable((observer) => {
      return this.http.get(url).subscribe({
        next: (data) => {
          if (!data) {
            console.error('Received invalid weather data');
            observer.error('Invalid weather data');
            return;
          }

          this.cache.set(cacheKey, data);
          observer.next(data);
        },
        error: (error) => {
          console.error('Error fetching weather data', error);
          observer.error(error);
        },
        complete: () => observer.complete(),
      });
    });
  }
}
