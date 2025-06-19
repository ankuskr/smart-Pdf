import { Injectable } from '@angular/core';
import { PredictedAgeResponse } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { CreateUserResponse } from '../models/create-user-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/users';
  private agePredictedResponce = environment.agePredictedResponce;

  constructor(private http: HttpClient) {}

  getPredictedAge(name: string) {
    return this.http.get<PredictedAgeResponse>(
      `${this.agePredictedResponce}${name}`
    );
  }
  createUser(userData: any): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(`${this.baseUrl}`, userData);
  }

  getAllUsers() {
    return this.http.get(this.baseUrl);
  }

  updateUser(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  uploadSignature(formData: FormData) {
    console.log('user service upload ', formData);
    return this.http.post<{ filePath: string }>(
      'http://localhost:3000/api/users/uploadSignature',
      formData
    );
  }
}
