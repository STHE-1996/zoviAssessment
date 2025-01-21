import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateWasteRequest, WasteRequest } from '../models/waste-request';

@Injectable({
  providedIn: 'root'
})
export class WasteService {
  private baseUrl = 'http://localhost:8080/api';
 
  
  constructor(private http: HttpClient) {}

  createWaste(wasteRequest: WasteRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.baseUrl}/CreateWaste`, wasteRequest, { headers: headers });
  }


  getAllWasteRecords(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllWaste/${userId}`);
  }

  updateWasteRecord(request: UpdateWasteRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/UpdateWaste`, request);
  }

  deleteWasteRecord(userId: string, wasteId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteWaste/${userId}/${wasteId}`);
  }

  getAllWasteRecordsForAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllWasteForStaff`);
  }


  updateWasteStatus(id: string, status: string): Observable<any> {
    const body = {
      id: id,
      status: status
    };
    return this.http.put(`${this.baseUrl}/updateStatus`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


}
