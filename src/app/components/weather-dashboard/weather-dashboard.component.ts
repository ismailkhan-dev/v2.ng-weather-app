import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStateService } from '../../services/weather-state/weather-state.service';
import { GeocodingStateService } from '../../services/geocoding-state/geocoding-state.service';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.css',
})
export class WeatherDashboardComponent implements OnInit, OnDestroy {
  weatherData: any;
  formattedAddress: string = '';

  private subscriptions = new Subscription();

  constructor(
    private weatherStateService: WeatherStateService,
    private geocodingStateService: GeocodingStateService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.weatherStateService.getWeatherData().subscribe((data) => {
        this.weatherData = data;
      }),
    );

    this.subscriptions.add(
      this.geocodingStateService.getFormattedAddress().subscribe((address) => {
        this.formattedAddress = address;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
