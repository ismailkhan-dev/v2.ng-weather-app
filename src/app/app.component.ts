import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';
import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';
import { HeaderComponent } from './components/header/header.component';
import { WeatherMapComponent } from './components/weather-map/weather-map.component';

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
export class AppComponent {
  title = 'v2.ng-weather-app';
}
