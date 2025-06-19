import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestClientService {
  constructor(private http: HttpClient) {}
  getCityData(country: string, state: string) {
    const payload = {
      country: country,
      state: state,
    };
    return this.http.post<any>(
      'https://countriesnow.space/api/v0.1/countries/state/cities',
      payload
    );
  }
}
