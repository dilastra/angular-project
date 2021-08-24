import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientsCompanyService {
  constructor(private http: HttpClient) {}

  public fetchClientsCompany(search = ''): Observable<any[]> {
    return this.http.get<any[]>(`${environment.endPoint}/client-company/list`, {
      params: {
        search,
      },
    });
  }

  public addNewCompanyClient(body: any) {
    return this.http.post(`${environment.endPoint}/client-company`, body);
  }

  public getClientCompany(id: string) {
    return this.http.get(`${environment.endPoint}/client-company/${id}`);
  }
}
