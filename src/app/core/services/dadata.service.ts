import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DadataService {
  constructor(private http: HttpClient) {}

  public getInnCompanies(inn: string | null, count: number): Observable<any> {
    return this.http.get<any>(
      `${environment.endPoint}/dadata/company?query=${inn}&count=${count}`
    );
  }

  public getAddresses(dadataSerachParams: any): Observable<any> {
    return this.http.post(
      `${environment.dadataUrl}/4_1/rs/suggest/address`,
      dadataSerachParams,
      {
        headers: {
          authorization: `Token ${environment.dadataApiKey}`,
        },
      }
    );
  }
}
