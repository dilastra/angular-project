import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Command,
  ConstituentDocumentsClientCompany,
  LeaseContract,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DossierService {
  constructor(private http: HttpClient) {}

  public getDossierCompanyClient(
    companyClientId: string
  ): Observable<ConstituentDocumentsClientCompany> {
    return this.http.get<ConstituentDocumentsClientCompany>(
      `${environment.endPoint}/dossier/${companyClientId}/constituent-documents`
    );
  }

  public updateConstituentDocumentsCompanyClient(
    companyClientId: string,
    updatedDossier: any
  ): Observable<any> {
    return this.http.patch(
      `${environment.endPoint}/dossier/${companyClientId}/constituent-documents`,
      updatedDossier
    );
  }

  public updateAppointmentSoleExecutiveBodyCompanyClient(
    companyClientId: string,
    updatedDossier: any
  ): Observable<Command> {
    return this.http.put<Command>(
      `${environment.endPoint}/dossier/${companyClientId}/constituent-documents/command`,
      updatedDossier
    );
  }

  public updateLeaseAgreementPremises(
    companyClientId: string,
    leaseAgreementPremises: any
  ): Observable<LeaseContract> {
    return this.http.put<LeaseContract>(
      `${environment.endPoint}/dossier/${companyClientId}/constituent-documents/lease-contract`,
      leaseAgreementPremises
    );
  }

  public updateOrgRedCertificate(
    companyClientId: string,
    orgRegCertificate: any
  ) {
    return this.http.put(
      `${environment.endPoint}/dossier/${companyClientId}/constituent-documents/org-reg-certificate`,
      orgRegCertificate
    );
  }
}
