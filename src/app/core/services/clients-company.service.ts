import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientsCompanyService {
  constructor(private http: HttpClient) {}

  public fetchClientsCompany(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.endPoint}/client-company/list`);
  }

  public addNewCompanyClient(body: any) {
    return this.http.post(`${environment.endPoint}/client-company`, body);
  }
}
