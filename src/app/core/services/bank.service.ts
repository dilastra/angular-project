import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Bank } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  constructor(private http: HttpClient) {}

  public getBankList(): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${environment.endPoint}/bank/list`);
  }
}
