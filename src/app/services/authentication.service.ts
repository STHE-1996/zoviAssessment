import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import {
  
  LoginRequest,
 
  RegisterRequest,
  UpdatePasswordRequest,
  
} from '../models/register-request';
import {
  AuthenticationResponse,
  ForgotPasswordResponse,
} from '../models/authentication-response';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '../jwt-helper.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080/api';
  private isAuthenticationSubject = new BehaviorSubject<boolean>(false);

 

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

  register(registerRequest: RegisterRequest) {
    return this.http.post<AuthenticationResponse>(
      `${this.baseUrl}/RegisterUser`,
      registerRequest
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

 

  login(credentials: LoginRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(`${this.baseUrl}/login`, credentials, { headers: headers })
      .pipe(
        map((response: any) => {
          if (response.responseCode === '200') {
            const token = response.data;
            const role = response.role;
            localStorage.setItem('role', role);
            localStorage.setItem('token', token);
            const userId = this.jwtHelper.getUserIdFromToken(token) || '';
            localStorage.setItem('userId', userId);
            console.log('userId :', userId);
            this.router.navigate(['/dash']);
          }
          return response;
        }),
        catchError((error) => {
          // Handle error and show alert
          this.handleError(error);
          return throwError(error);
        })
      );
  }

  private handleError(error: any): void {
    let errorMessage = 'An error occurred';
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    alert(errorMessage);
  }

  sendOTP(email: string): Observable<string | null> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const payload = {
      email: email,
    };

    return this.http
      .post(`${this.baseUrl}/ForgotPassword`, payload, { headers: headers })
      .pipe(
        catchError((error: any) => {
          console.error('Error sending OTP', error);

          if (error instanceof HttpErrorResponse && error.status === 200) {
            const errorMessage = error.error
              ? error.error.responseMessage || 'The Account does not exist'
              : 'The Account does not exist';
            alert('Error sending OTP: ' + errorMessage);
          } else {
            alert('The Account does not exist');
          }

          // Returning an empty string to avoid potential issues
          return of('');
        }),
        map((response: any) => response && response.responseMessage)
      );
  }

  private userId: string | null = null;

  setUserId(userId: string): void {
    this.userId = userId;
  }


  clearUserId(): void {
    this.userId = null;
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/User/${userId}`);
  }
  
  updatePassword(request: UpdatePasswordRequest): Observable<any> {
    const url = `${this.baseUrl}/UpdatePassword`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(url, request, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating password', error);
        return throwError(error);
      })
    );
  }


  
}
