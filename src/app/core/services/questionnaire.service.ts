import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Questionnaire } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  constructor(private http: HttpClient) {}

  public getQuestionnaireClientCompany(
    clientCompanyId: string
  ): Observable<Questionnaire> {
    return this.http.get<Questionnaire>(
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
