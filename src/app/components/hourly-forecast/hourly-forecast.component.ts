import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStateService } from '../../services/weather-state/weather-state.service';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.css',
})
export class HourlyForecastComponent {}
