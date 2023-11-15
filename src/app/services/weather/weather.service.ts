import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    const url = `${this.API_URL}?lat=${lat}&lon=${long}&appid=${this.API_KEY}`;
    const cacheKey = `weather-data-${lat}-${long}`;

    // Check if the data is already in the cache
    if (this.cache.has(cacheKey)) {
      console.log('Returned cached data');
      return of(this.cache.get(cacheKey));
    }

    console.log('Fetched new data: ', url);
    return new Observable((observer) => {
      return this.http.get(url).subscribe({
        next: (data) => {
          this.cache.set(cacheKey, data);
          observer.next(data);
        },
        error: (error) => observer.error(error),
        complete: () => observer.complete(),
      });
    });
  }
}
