import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  getStates(country: string): string[] {
    const states: { [key: string]: string[] } = {
      USA: ['California', 'Texas', 'New York'],
      India: ['Maharashtra', 'Karnataka', 'Delhi'],
      Canada: ['Ontario', 'Quebec', 'British Columbia'],
    };
    return states[country] || [];
  }

  getCities(state: string): string[] {
    const citiesByState: { [key: string]: string[] } = {
      California: ['Los Angeles', 'San Francisco', 'San Diego'],
      Texas: ['Houston', 'Austin', 'Dallas'],
      'New York': ['New York City', 'Buffalo', 'Rochester'],
      Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
      Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
      Delhi: ['New Delhi', 'Noida', 'Gurgaon'],
      Ontario: ['Toronto', 'Ottawa', 'Hamilton'],
      Quebec: ['Montreal', 'Quebec City', 'Laval'],
      'British Columbia': ['Vancouver', 'Victoria', 'Kelowna'],
    };

    return citiesByState[state] || [];
  }
}
