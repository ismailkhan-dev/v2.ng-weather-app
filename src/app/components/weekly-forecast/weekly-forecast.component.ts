import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStateService } from '../../services/weather-state/weather-state.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { WeatherIconService } from '../../services/weather-icon/weather-icon.service';

@Component({
  selector: 'app-weekly-forecast',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatExpansionModule, MatIconModule],
  templateUrl: './weekly-forecast.component.html',
  styleUrl: './weekly-forecast.component.css',
})
export class WeeklyForecastComponent implements OnInit, OnDestroy {
  weatherData: any;
  dailyForecast: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'date',
    'temperature',
    'description',
    'expandedIndicator',
  ];
  clickedRows = new Set();
  expandedElement: any | null;

  private subscriptions = new Subscription();

  constructor(
    private weatherStateService: WeatherStateService,
    private weatherIconService: WeatherIconService,
  ) {}

  onRowClicked(row: any): void {
    this.clickedRows.add(row);
  }

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
          // console.log('dailyForecast', this.dailyForecast);
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
