import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeocodingStateService } from '../../services/geocoding-state/geocoding-state.service';

@Component({
  selector: 'app-today-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './today-info.component.html',
  styleUrl: './today-info.component.css',
})
export class TodayInfoComponent {
  formattedAddress: string = '';

  constructor(private geocodingStateService: GeocodingStateService) {}

  getAddress() {
    this.geocodingStateService.getFormattedAddress().subscribe((address) => {
      this.formattedAddress = address;
      console.log(this.formattedAddress);
    });
  }
}
