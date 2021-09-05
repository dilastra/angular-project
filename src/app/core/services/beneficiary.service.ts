import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Beneficiary } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BeneficiaryService {
  constructor(private http: HttpClient) {}

  public getBeneficiariesClientCompany(
    clientCompanyId: string
  ): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(
      `${environment.endPoint}/dossier/${clientCompanyId}/owner/list`
    );
  }

  public addNewBeneficiar(clientCompanyId: string): Observable<Beneficiary> {
    return this.http.post<Beneficiary>(
      `${environment.endPoint}/dossier/${clientCompanyId}/owner`,
      {}
    );
  }

  public removeBeneficiar(clientCompanyId: string, idBeneficiary: string) {
    return this.http.delete(
      `${environment.endPoint}/dossier/${clientCompanyId}/owner/${idBeneficiary}`,
      {}
    );
  }

  public updateShare(
    clientCompanyId: string,
    idBeneficiary: string,
    share: number
  ) {
    return this.http.put(
      `${environment.endPoint}/dossier/${clientCompanyId}/owner/${idBeneficiary}`,
      { share }
    );
  }

  public updatePassport(
    clientCompanyId: string,
    idBeneficiary: string,
    passport: any
  ) {
    return this.http.put(
      `${environment.endPoint}/dossier/${clientCompanyId}/owner/${idBeneficiary}/passport`,
      passport
    );
  }

  public updatePlaceResidence(
    clientCompanyId: string,
    idBeneficiary: string,
    placeResidence: any
  ) {
    return this.http.put(
      `${environment.endPoint}/dossier/${clientCompanyId}/owner/${idBeneficiary}/place-residence`,
      placeResidence
    );
  }

  public updateSnils(
    clientCompanyId: string,
    idBeneficiary: string,
    snils: any
  ) {
    return this.http.put(
      `${environment.endPoint}/dossier/${clientCompanyId}/owner/${idBeneficiary}/snils`,
      snils
    );
  }
}
