import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';
import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SearchBarComponent,
    WeatherDashboardComponent,
    DailyForecastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'v2.ng-weather-app';
}
