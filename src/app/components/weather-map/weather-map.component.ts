import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  HttpClient,
  HttpClientJsonpModule,
  HttpClientModule,
} from '@angular/common/http';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { WeatherStateService } from '../../services/weather-state/weather-state.service';
@Component({
  selector: 'app-weather-map',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  templateUrl: './weather-map.component.html',
  styleUrl: './weather-map.component.css',
})
export class WeatherMapComponent implements OnInit, OnDestroy {
  mapLoaded!: Observable<boolean>;
  isMapReady: boolean = false;
  API_KEY = environment.GEO_API_KEY;
  MAPS_BASE_URL = environment.MAPS_API_URL;
  URL = this.MAPS_BASE_URL + '?key=' + this.API_KEY;

  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };

  mapOptions: google.maps.MapOptions = {
    zoom: 10, // Set the zoom level as needed
    zoomControl: false, // Disables the zoom control
    scrollwheel: false, // Disables zooming with the mouse scroll wheel
    disableDoubleClickZoom: true, // Disables zooming with double click
    draggable: false, // Disables dragging to pan
    keyboardShortcuts: false, // Disables map control with keyboard
    streetViewControl: false, // Disables the Street View control
    fullscreenControl: false, // Disables the fullscreen control
  };

  private subscriptions = new Subscription();

  constructor(
    private weatherStateService: WeatherStateService,
    private http: HttpClient,
  ) {
    this.mapLoaded = this.loadMap();
  }

  loadMap(): Observable<boolean> {
    return this.http.jsonp(this.URL, 'callback').pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.weatherStateService.getWeatherData().subscribe((data) => {
        if (data?.lat && data?.lon) {
          this.center = {
            lat: data.lat,
            lng: data.lon,
          };
          this.isMapReady = true;
          console.log('this.center', this.center);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
