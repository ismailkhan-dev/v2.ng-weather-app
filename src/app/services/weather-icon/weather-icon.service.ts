import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherIconService {
  private BASE_URL = 'https://openweathermap.org/img/wn/';

  getIconUrl(iconCode: string): string {
    return `${this.BASE_URL}${iconCode}@2x.png`;
  }
}
