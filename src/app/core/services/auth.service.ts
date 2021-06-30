import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '@credex/api-interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthData } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(data: AuthData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.apiPrefix}/auth/login/user`,
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
    return this.getTokenFromLocalStorage();
  }
}
