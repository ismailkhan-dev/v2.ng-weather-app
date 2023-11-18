import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStateService } from '../../services/weather-state/weather-state.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { WeatherIconService } from '../../services/weather-icon/weather-icon.service';

@Component({
  selector: 'app-daily-forecast',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './daily-forecast.component.html',
  styleUrl: './daily-forecast.component.css',
})
export class DailyForecastComponent implements OnInit, OnDestroy {
  weatherData: any;
  dailyForecast: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['date', 'temperature', 'description'];

  private subscriptions = new Subscription();

  constructor(
    private weatherStateService: WeatherStateService,
    private weatherIconService: WeatherIconService,
  ) {}

  getWeatherIconUrl(iconCode: string): string {
    return this.weatherIconService.getIconUrl(iconCode);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.weatherStateService.getWeatherData().subscribe((data) => {
        if (data?.daily) {
          this.weatherData = data;
          this.dailyForecast = data.daily;
          this.dataSource.data = this.dailyForecast;
          console.log('dailyForecast', this.dailyForecast);
        } else {
          this.weatherData = null;
          this.dailyForecast = [];
          this.dataSource.data = [];
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
