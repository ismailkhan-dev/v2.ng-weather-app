import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// This service is a shared state service that holds the state of the weather data.

@Injectable({
  providedIn: 'root',
})
export class WeatherStateService {
  private weatherDataSubject = new BehaviorSubject<any>(null);

  setWeatherData(data: any): void {
    this.weatherDataSubject.next(data);
  }

  getWeatherData(): Observable<any> {
    return this.weatherDataSubject.asObservable();
  }
}
