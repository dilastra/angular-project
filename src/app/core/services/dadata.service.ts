import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DadataService {
  constructor(private http: HttpClient) {}

  public getInnCompaniesFromDadata(
    inn: string | null,
    count: number
  ): Observable<any> {
    return this.http.post(
      `${environment.dadataUrl}/4_1/rs/suggest/party`,
      { query: inn, count, status: ['ACTIVE'] },
      {
        headers: {
          authorization: `Token ${environment.dadataApiKey}`,
        },
      }
    );
  }
}
