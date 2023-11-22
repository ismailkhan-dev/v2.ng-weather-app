import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { BrowserGeolocationService } from '../../services/browser-geolocation/browser-geolocation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClockComponent } from '../clock/clock.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, ClockComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  temperatureUnit: string = 'celsius';

  constructor(
    private browserGeolocationService: BrowserGeolocationService,
    private _snackBar: MatSnackBar,
  ) {}

  //TODO: refactor this into a shared component with the same in search-bar
  showSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar'],
    });
  }

  //TODO: update this function to trigger the browser to open the permission dialogbox
  handleGetWeatherBtn() {
    this.browserGeolocationService.getLocation().subscribe({
      next: (position) => {
        // console.log('browser position', position);
      },
      error: (error) => {
        console.error('geolocation error', error);
        this.showSnackBar('Enable location permissions in your browser!');
      },
    });
  }

  setTemperatureUnit(unit: string) {
    this.temperatureUnit = unit;
    console.log('Selected Unit:', this.temperatureUnit);
    // Additional logic to handle the change in temperature unit
  }
}
