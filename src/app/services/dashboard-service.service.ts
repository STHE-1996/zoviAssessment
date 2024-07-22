import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  getGenderCounts(): Observable<{ maleCount: number, femaleCount: number }> {
    return this.http.get<{ maleCount: number, femaleCount: number }>(`${this.baseUrl}/counts`);
  }
}
