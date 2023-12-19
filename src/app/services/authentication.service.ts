import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import {
  ChurchName,
  LoginRequest,
  Province,
  RegisterRequest,
} from '../models/register-request';
import {
  AuthenticationResponse,
  ForgotPasswordResponse,
} from '../models/authentication-response';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest) {
    return this.http.post<AuthenticationResponse>(
      `${this.baseUrl}/Registration`,
      registerRequest
    );
  }

  getProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.baseUrl}/Provinces`).pipe(
      tap((response) => console.log('Raw API Response:', response)),
      catchError((error) => {
        console.error('Error fetching provinces', error);
        return throwError(error);
      })
    );
  }

  getChurchNames(): Observable<ChurchName[]> {
    return this.http.get<ChurchName[]>(`${this.baseUrl}/ChurchNames`).pipe(
      tap((Response) => console.log('Raw API Response:', Response)),
      catchError((error) => {
        console.error('error fetching churches', error);
        return throwError(error);
      })
    );
  }

  verifyAccount(pin: string): Observable<any> {
    return this.http
      .post<any>(
        `${this.baseUrl}/VerifyAccount`,
        { enteredPin: pin },
        { responseType: 'text' as 'json' } // explicitly specify responseType as 'json' to prevent type issues
      )
      .pipe(
        catchError((error) => {
          console.error('Error verifying account', error);
          return throwError(error);
        })
      );
  }

  login(credentials: LoginRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(`${this.baseUrl}/Login`, credentials, { headers: headers })
      .pipe(
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

  sendOTP(username: string, channel: string): Observable<string | null> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const payload = {
      whatsappNumber: username,
      channelType: channel,
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
}
