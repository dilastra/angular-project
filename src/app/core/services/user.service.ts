import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '@credex/api-interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: IUser;

  constructor(private http: HttpClient) {}

  public fetchUser() {
    return this.http.get(`${environment.apiPrefix}/user`);
  }

  public setUser(user: IUser) {
    this.user = user;
  }

  public getUser() {
    return this.user;
  }
}
