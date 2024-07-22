import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtHelperService {

  constructor() { }

  decodeToken(token: string): any {
    if (!token) {
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    const decodedPayload = atob(parts[1]);
    return JSON.parse(decodedPayload);
  }

  getUserIdFromToken(token: string): string | null {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.userId : null; // Extract userId
  }
}
