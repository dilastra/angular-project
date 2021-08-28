import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BalanceSheetsService {
  constructor(private http: HttpClient) {}

  public getFormBalanceSheet(clientCompanyId: string, typeForm: number) {
    return this.http.get(
      `${environment.endPoint}/dossier/${clientCompanyId}/balance-sheet?type=${typeForm}`
    );
  }
}
