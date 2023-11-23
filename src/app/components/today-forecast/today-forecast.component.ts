import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStateService } from '../../services/weather-state/weather-state.service';
import { WeatherIconService } from '../../services/weather-icon/weather-icon.service';
import { GeocodingStateService } from '../../services/geocoding-state/geocoding-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-today-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './today-forecast.component.html',
  styleUrl: './today-forecast.component.css',
})
export class TodayForecastComponent implements OnInit {
  weatherData: any | null;
  hourlyWeatherData: any;
  hourlyWeather: any[] = [];
  todayTemp: any;
  formattedAddress: string = '';

  timePeriods = [
    { label: 'Morning', index: 1, temp: 'morn' },
    { label: 'Afternoon', index: 2, temp: 'day' },
    { label: 'Evening', index: 3, temp: 'eve' },
    { label: 'Overnight', index: 0, temp: 'night' },
  ];

  private subscriptions = new Subscription();

  constructor(
    private weatherStateService: WeatherStateService,
    private weatherIconService: WeatherIconService,
    private geocodingStateService: GeocodingStateService,
  ) {}

  getWeatherIconUrl(iconCode: string): string {
    return this.weatherIconService.getIconUrl(iconCode);
  }

  ngOnInit(): void {
    this.weatherStateService.getWeatherData().subscribe((data) => {
      if (data && data.hourly) {
        this.weatherData = data;
        this.todayTemp = this.weatherData?.daily[0]?.temp;
        this.hourlyWeatherData = this.weatherData?.hourly;

        this.extractHourlyWeather();
      }
    });
  }

  private extractHourlyWeather(): void {
    const targetHours = [6, 12, 18, 0];

    // get current date without time
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const nextDate = new Date();
    nextDate.setDate(currentDate.getDate() + 1);

    if (!this.hourlyWeatherData) {
      console.error('Hourly weather data is not available for extraction');
      return;
    }

    // Find and push weather data for the target hours
    this.hourlyWeather = this.hourlyWeatherData.filter((hourData: any) => {
      const date = new Date(hourData.dt * 1000);

      return (
        date >= currentDate &&
        date < nextDate &&
        targetHours.includes(date.getHours())
      );
    });

    this.hourlyWeather = this.hourlyWeather.slice(0, 4);
    // [0=12am, 1=6am, 2=12pm, 3=6pm]
  }

  getFormattedAddress() {
    this.geocodingStateService.getFormattedAddress().subscribe((address) => {
      this.formattedAddress = address;
      console.log(this.formattedAddress);
    });
  }
}
