import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  constructor(private http: HttpClient) {}

  public getQuestionnaireClientCompany(clientCompanyId: string) {
    return this.http.get(
      `${environment.endPoint}/dossier/${clientCompanyId}/questionnaire`
    );
  }

  public updateQuestionnaireClientCompany(
    clientCompanyId: string,
    questionnaire: any
  ) {
    return this.http.put(
      `${environment.endPoint}/dossier/${clientCompanyId}/questionnaire`,
      questionnaire
    );
  }
}
