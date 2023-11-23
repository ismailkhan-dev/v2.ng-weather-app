import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeocodingStateService } from '../../services/geocoding-state/geocoding-state.service';
import { WeatherStateService } from '../../services/weather-state/weather-state.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-today-info',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './today-info.component.html',
  styleUrl: './today-info.component.css',
})
export class TodayInfoComponent {
  formattedAddress: string = '';
  currentWeather: any;
  dailyWeather: any;
  weatherData: any;
  weatherEntries: { label: string; value: any }[] = [];

  constructor(
    private geocodingStateService: GeocodingStateService,
    private weatherStateService: WeatherStateService,
  ) {}

  getAddress() {
    this.geocodingStateService.getFormattedAddress().subscribe((address) => {
      this.formattedAddress = address;
      console.log(this.formattedAddress);
    });
  }

  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData() {
    this.weatherStateService.getWeatherData().subscribe((data) => {
      if (data) {
        this.weatherData = data;
        this.currentWeather = data.current;
        this.dailyWeather = data.daily[0];
        this.weatherEntries = [
          ...this.extractWeatherData(this.currentWeather),
          ...this.extractDailyWeather(this.dailyWeather),
        ];

        console.log('weatherEntries', this.weatherEntries);
        console.log('currentWeather', this.currentWeather);
        console.log('dailyWeather', this.dailyWeather);
      }
    });
  }

  private extractWeatherData(data: any): { label: string; value: any }[] {
    return [
      { label: 'Pressure', value: `${data.pressure} hPa` },
      { label: 'Humidity', value: `${data.humidity}%` },
      { label: 'Dew Point', value: `${data.dew_point}°C` },
      { label: 'UV Index', value: data.uvi },
      { label: 'Clouds', value: `${data.clouds}%` },
      { label: 'Visibility', value: `${data.visibility / 1000} km` },
      { label: 'Wind Speed', value: `${data.wind_speed} m/s` },
      { label: 'Wind Degree', value: `${data.wind_deg}°` },
      { label: 'Wind Gust', value: `${data.wind_gust}°` },
    ];
  }

  private extractDailyWeather(data: any): { label: string; value: any }[] {
    return [
      { label: 'Summary', value: data.summary },
      { label: 'Rain', value: `${data.pop * 100} %` },
      { label: 'Day Temperature', value: `${data.temp.day}°C` },
      { label: 'Min Temperature', value: `${data.temp.min}°C` },
      { label: 'Max Temperature', value: `${data.temp.max}°C` },
      { label: 'Night Temperature', value: `${data.temp.night}°C` },
      { label: 'Evening Temperature', value: `${data.temp.eve}°C` },
      { label: 'Morning Temperature', value: `${data.temp.morn}°C` },
      { label: 'Day Feels Like', value: `${data.feels_like.day}°C` },
      { label: 'Night Feels Like', value: `${data.feels_like.night}°C` },
      { label: 'Evening Feels Like', value: `${data.feels_like.eve}°C` },
      { label: 'Morning Feels Like', value: `${data.feels_like.morn}°C` },
      {
        label: 'Sunrise',
        value: new Date(data.sunrise * 1000).toLocaleTimeString(),
      },
      {
        label: 'Sunset',
        value: new Date(data.sunset * 1000).toLocaleTimeString(),
      },
      {
        label: 'Moonrise',
        value: new Date(data.moonrise * 1000).toLocaleTimeString(),
      },
      {
        label: 'Moonset',
        value: new Date(data.moonset * 1000).toLocaleTimeString(),
      },
      { label: 'Moon Phase', value: data.moon_phase },
    ];
  }
}
