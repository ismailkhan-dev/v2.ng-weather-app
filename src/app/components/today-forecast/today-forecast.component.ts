import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-today-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './today-forecast.component.html',
  styleUrl: './today-forecast.component.css',
})
export class TodayForecastComponent {}
