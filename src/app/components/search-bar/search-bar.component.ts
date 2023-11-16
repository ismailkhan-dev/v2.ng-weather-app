import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeatherService } from '../../services/weather/weather.service';
import { GeocodingService } from '../../services/geocoding/geocoding.service';
import { FormValidatorDirective } from '../../directives/form-validator.directive';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    FormValidatorDirective,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  searchTerm: string = '';
  isInvalidInput: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private geocodingService: GeocodingService,
    private changeDetectorRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
  ) {}

  handleInvalidInput(isInvalid: boolean): void {
    this.isInvalidInput = isInvalid;
    this.changeDetectorRef.detectChanges();
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      console.error('Search term is empty or only whitespace');
      return;
    }

    this.geocodingService.getCoordinates(this.searchTerm).subscribe({
      next: (geocodingResponse) => {
        if (
          !geocodingResponse ||
          !geocodingResponse.results ||
          geocodingResponse.results.length === 0
        ) {
          console.error(
            'No results found or invalid response for this location',
          );

          this._snackBar.open(
            'Weather data fetched unsuccessfully ❌',
            'Close',
            {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            },
          );
          return;
        }

        if (geocodingResponse.results && geocodingResponse.results.length > 0) {
          const location = geocodingResponse.results[0].geometry.location;

          if (!location || location.lat == null || location.lng == null) {
            console.error('Invalid location data received.');
            return;
          }

          console.log('Geocoding lat/lng results: ', location);

          this.fetchWeatherData(location.lat, location.lng);
        } else {
          console.error('No results found for this location');
        }
      },
      error: (geocodingError) => {
        console.error('Error fetching location data:', geocodingError);
      },
      complete: () => {
        console.log('Geolocation data fetch complete.');
      },
    });
  }

  private fetchWeatherData(lat: number, lng: number): void {
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      console.error('Invalid latitude or longitude values');
      return;
    }

    this.weatherService.getWeatherData(lat, lng).subscribe({
      next: (weatherData) => {
        if (!weatherData) {
          console.error('Invalid or empty weather data received');
          return;
        }

        console.log('Weather data: ', weatherData);
        this._snackBar.open('Weather data fetched successfully ✅', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });

        // TODO: Handle the weather data here, from another function.
      },
      error: (weatherError) => {
        console.error('Error fetching weather data: ', weatherError);
      },
      complete: () => {
        console.log('Weather data fetch complete');
      },
    });
  }
}
