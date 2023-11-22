import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';
import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';
import { HeaderComponent } from './components/header/header.component';
import { WeatherMapComponent } from './components/weather-map/weather-map.component';
import { BrowserGeolocationService } from './services/browser-geolocation/browser-geolocation.service';
import { IpGeolocationService } from './services/ip-geolocation/ip-geolocation.service';
import { WeatherService } from './services/weather/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    WeatherDashboardComponent,
    DailyForecastComponent,
    WeatherMapComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'v2.ng-weather-app';

  constructor(
    private browserGeolocationService: BrowserGeolocationService,
    private ipGeolocationService: IpGeolocationService,
    private weatherService: WeatherService,
  ) {}

  ngOnInit() {
    this.getWeatherData();
  }

  private getWeatherData() {
    this.browserGeolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        let browserCoords = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
        console.log('Fetched coords from browser', browserCoords);
        this.fetchWeather(browserCoords.lat, browserCoords.long);
      },
      error: (error) => {
        console.error('browserGeolocationService error:', error);
        this.getIpGeolocation();
      },
    });
  }

  private fetchWeather(lat: number, long: number) {
    this.weatherService.getWeatherData(lat, long).subscribe({
      next: (weatherData) => {
        console.log('Weather data', weatherData);
      },
      error: (weatherError) => {
        console.error('Weather service error', weatherError);
      },
    });
  }

  private getIpGeolocation() {
    this.ipGeolocationService.getApproximateLocation().subscribe({
      next: (position) => {
        let ipCoords = {
          lat: position.latitude,
          long: position.longitude,
        };
        console.log('Fetched coords from ip service:', ipCoords);
        this.fetchWeather(ipCoords.lat, ipCoords.long);
      },
      error: (error) => {
        console.error('Geolocation error:', error);
      },
    });
  }
}
