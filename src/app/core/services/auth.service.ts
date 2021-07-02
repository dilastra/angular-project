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

  public login(data: AuthData): Observable<AuthToken> {
    return this.http.post<AuthToken>(
      `${environment.endPoint}/auth/login/user`,
      data
    );
  }

  public setTokenToLocalStorage(token: string): void {
    localStorage.setItem('token', token);
  }

  public getTokenFromLocalStorage(): string {
    return localStorage.getItem('token') ?? '';
  }

  public isAuthenticated() {
    // return this.getTokenFromLocalStorage();
    return true;
  }
}
