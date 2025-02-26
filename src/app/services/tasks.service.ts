import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskRequest, UpdateTaskRequest } from '../models/task-requesting';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
 private baseUrl = 'http://localhost:8080/api';
 
  
  constructor(private http: HttpClient) {}

  createTask(taskRequest: TaskRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.baseUrl}/CreateTask`, taskRequest, { headers: headers });
  }


  getAllTaskRecords(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllTask/${userId}`);
  }

  updateTaskRecord(request: UpdateTaskRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/UpdateTask`, request);
  }

  deleteTaskRecord(userId: string, wasteId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteTask/${userId}/${wasteId}`);
  }

  getAllWasteRecordsForAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllWasteForStaff`);
  }


  updateTaskStatus(id: string, status: string): Observable<any> {
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
