import { Injectable } from '@angular/core';
import { RestClientService } from './rest-client.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private restClient: RestClientService) {}
  getStates(country: string): string[] {
    const states: { [key: string]: string[] } = {
      'United States': ['California', 'Texas', 'New York'],
      // India: ['Maharashtra', 'Karnataka', 'Delhi'],
      India: [
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal',
        'Andaman and Nicobar Islands',
        'Chandigarh',
        'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi',
        'Jammu and Kashmir',
        'Ladakh',
        'Lakshadweep',
        'Puducherry',
      ],
      Canada: ['Ontario', 'Quebec', 'British Columbia'],
    };
    return states[country] || [];
  }

  getCities(country: string, state: string): Observable<string[]> {
    return this.restClient
      .getCityData(country, state)
      .pipe(map((response: { data: any }) => response.data || []));
  }
}
