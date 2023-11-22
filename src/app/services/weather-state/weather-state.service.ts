import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// This service is a shared state service that holds the state of the weather data. This weather data can come from weather api from the search bar or from app startup at launch from the browser coords or ip service coords.

@Injectable({
  providedIn: 'root',
})
export class WeatherStateService {
  private weatherDataSubject = new BehaviorSubject<any>(null);

  setWeatherData(data: any): void {
    this.weatherDataSubject.next(data);
    // console.log(
    //   'WeatherStateService setWeatherData successful! Data is here: ',
    //   data,
    // );
  }

  getWeatherData(): Observable<any> {
    return this.weatherDataSubject.asObservable();
  }
}
