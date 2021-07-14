import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthData, AuthToken } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public fetchLogin(data: AuthData): Observable<AuthToken> {
    return this.http.post<AuthToken>(
      `${environment.endPoint}/auth/login/user`,
      data
    );
  }

  public setTokenToLocalStorage(token: AuthToken): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  public getTokenFromLocalStorage(): string {
    return localStorage.getItem('token')
      ? JSON.parse(localStorage.getItem('token')!).token
      : '';
  }

  private getExpiresInOfTokenFromLocalStorage(): string {
    return localStorage.getItem('token')
      ? JSON.parse(localStorage.getItem('token')!)?.expiresIn
      : '';
  }

  public isAuthenticated() {
    if (this.getExpiresInOfTokenFromLocalStorage()) {
      const dateExpiresIn = new Date(
        +this.getExpiresInOfTokenFromLocalStorage() * 1000
      );
      return dateExpiresIn > new Date();
    }
    return false;
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
