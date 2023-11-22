import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IpGeolocationService {
  private readonly IP_API_URL = 'https://ipapi.co/json/';

  constructor(private http: HttpClient) {}

  public getApproximateLocation(): Observable<any> {
    return this.http.get(this.IP_API_URL);
  }
}
