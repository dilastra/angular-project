import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User | undefined;

  constructor(private http: HttpClient) {}

  public fetchUser(): Observable<User> {
    return this.http.get<User>(`${environment.endPoint}/user`);
  }

  public setUser(user: User) {
    this.user = user;
  }

  public getUser() {
    return this.user;
  }
}
