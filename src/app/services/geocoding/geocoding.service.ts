import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private API_URL = environment.GEO_API_URL;

  constructor(private http: HttpClient) {}

  getCoordinates(address: string): Observable<any> {
    const url = `${this.API_URL}?address=${encodeURIComponent(address)}&key=${
      environment.GEO_API_KEY
    }`;

    return this.http.get(url);
  }
}
