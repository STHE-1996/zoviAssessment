import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WasteRequest, UpdateWasteRequest } from '../models/waste-request';
import { RecyclingRequest, UpdateLocationRequest } from '../models/recycling-request';

@Injectable({
  providedIn: 'root'
})
export class RecyclingService {
  private baseUrl = 'http://localhost:8080/api';
 
  
  constructor(private http: HttpClient) {}

  createLocation(recyclingRequest: RecyclingRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.baseUrl}/CreateRecyclingLocation`, recyclingRequest, { headers: headers });
  }


  getAllLocationRecords(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllRecycling/${userId}`);
  }

  updateLocationRecord(request: UpdateLocationRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/UpdateRecycling`, request);
  }

  deleteLocationRecord(userId: string, recyclingId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteRecyclingLocation/${userId}/${recyclingId}`);
  }
}
