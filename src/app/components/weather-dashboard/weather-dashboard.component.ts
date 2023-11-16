import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStateService } from '../../services/weather-state/weather-state.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.css',
})
export class WeatherDashboardComponent implements OnInit {
  weatherData: any;

  constructor(private weatherStateService: WeatherStateService) {}

  ngOnInit(): void {
    this.weatherStateService.getWeatherData().subscribe((data) => {
      this.weatherData = data;
    });
  }
}
