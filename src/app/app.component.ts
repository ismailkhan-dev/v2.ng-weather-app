import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';
import { WeeklyForecastComponent } from './components/weekly-forecast/weekly-forecast.component';
import { HeaderComponent } from './components/header/header.component';
import { WeatherMapComponent } from './components/weather-map/weather-map.component';
import { BrowserGeolocationService } from './services/browser-geolocation/browser-geolocation.service';
import { IpGeolocationService } from './services/ip-geolocation/ip-geolocation.service';
import { WeatherService } from './services/weather/weather.service';
import { WeatherStateService } from './services/weather-state/weather-state.service';
import { GeocodingStateService } from './services/geocoding-state/geocoding-state.service';
import { GeocodingService } from './services/geocoding/geocoding.service';
import { TodayForecastComponent } from './components/today-forecast/today-forecast.component';
import { TodayInfoComponent } from './components/today-info/today-info.component';
import { HourlyForecastComponent } from './components/hourly-forecast/hourly-forecast.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    WeatherDashboardComponent,
    WeeklyForecastComponent,
    WeatherMapComponent,
    TodayForecastComponent,
    TodayInfoComponent,
    HourlyForecastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'v2.ng-weather-app';

  constructor(
    private browserGeolocationService: BrowserGeolocationService,
    private ipGeolocationService: IpGeolocationService,
    private geocodingService: GeocodingService,
    private geocodingStateService: GeocodingStateService,
    private weatherService: WeatherService,
    private weatherStateService: WeatherStateService,
  ) {}

  ngOnInit() {
    // this.getWeatherData();
  }

  private getWeatherData() {
    this.browserGeolocationService.getLocation().subscribe({
      next: (obj) => {
        let coords = {
          lat: obj.coords.latitude,
          long: obj.coords.longitude,
        };

        this.geocodingService
          .reverseGeocodingForAddress(coords.lat, coords.long)
          .subscribe({
            next: (data: any) => {
              const formattedAddress = data.results[7].formatted_address;
              this.geocodingStateService.setFormattedAddress(formattedAddress);
            },
            error: (data) => {
              console.error('reverseGeocodingForAddress service error', data);
            },
          });

        console.log('Fetched coords from browser', coords);
        this.fetchWeather(coords.lat, coords.long);
      },
      error: (error) => {
        console.error('browserGeolocationService error:', error);
        this.getIpGeolocation();
      },
    });
  }

  private getIpGeolocation() {
    this.ipGeolocationService.getLocation().subscribe({
      next: (obj) => {
        let location = {
          city: obj.city,
          region: obj.region_code,
          country: obj.country_name,
        };

        let formattedAddress = `${location.city}, ${location.region}, ${location.country}`;
        // console.log('formattedAddress', formattedAddress);
        this.geocodingStateService.setFormattedAddress(formattedAddress);

        let coords = {
          lat: obj.latitude,
          long: obj.longitude,
        };
        // console.log('Fetched coords from ip service:', coords);
        this.fetchWeather(coords.lat, coords.long);
      },
      error: (error) => {
        console.error('Geolocation error:', error);
      },
    });
  }

  private fetchWeather(lat: number, long: number) {
    this.weatherService.getWeatherData(lat, long).subscribe({
      next: (weatherData) => {
        // console.log('Weather data', weatherData);
        this.weatherStateService.setWeatherData(weatherData);
      },
      error: (weatherError) => {
        console.error('Weather service error', weatherError);
      },
    });
  }
}
