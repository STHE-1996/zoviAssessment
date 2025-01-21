import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private baseUrl = 'http://localhost:8080/api';



  constructor(private http: HttpClient) { }

  verifyAccount(pin: string): Observable<any> {
    return this.http
      .post<any>(
        `${this.baseUrl}/VerifyAccount`,
        { enteredPin: pin },
        { responseType: 'text' as 'json' } 
      )
      .pipe(
        catchError((error) => {
          console.error('Error verifying account', error);
          return throwError(error);
        })
      );
  }
}
