import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BalanceSheetsService {
  constructor(private http: HttpClient) {}

  public getForm(clientCompanyId: string, typeForm: number) {
    return this.http
      .get(
        `${environment.endPoint}/dossier/${clientCompanyId}/balance-sheet?type=${typeForm}`
      )
      .pipe(
        map((balanceSheets: any) => {
          const { form, ...otherValues } = balanceSheets;
          return {
            form: typeForm === 1 ? this.rebuildFormOne(form) : form,
            ...otherValues,
          };
        })
      );
  }

  public getFormFromArchive(clientCompanyId: string, typeForm: number) {
    return this.http
      .get(
        `${environment.endPoint}/dossier/${clientCompanyId}/balance-sheet/archive?type=${typeForm}`
      )
      .pipe(
        map((balanceSheets: any) => {
          const { form, ...otherValues } = balanceSheets;
          return {
            form: typeForm === 1 ? this.rebuildFormOne(form) : form,
            ...otherValues,
          };
        })
      );
  }

  public getArchiveForm(clientCompanyId: string, typeForm: number) {
    return this.http
      .get(
        `${environment.endPoint}/dossier/${clientCompanyId}/balance-sheet?type=${typeForm}`
      )
      .pipe(
        map((balanceSheets: any) => {
          const { form, ...otherValues } = balanceSheets;
          return {
            form: typeForm === 1 ? this.rebuildFormOne(form) : form,
            ...otherValues,
          };
        })
      );
  }

  public changeFileForm(clientCompanyId: string, typeForm: number, body: any) {
    return this.http
      .put(
        `${environment.endPoint}/dossier/${clientCompanyId}/balance-sheet?type=${typeForm}`,
        body
      )
      .pipe(
        map((balanceSheets: any) => {
          const { form, ...otherValues } = balanceSheets;
          return {
            form: typeForm === 1 ? this.rebuildFormOne(form) : form,
            ...otherValues,
          };
        })
      );
  }

  public changeValueForm(clientCompanyId: string, typeForm: number, body: any) {
    return this.http.patch(
      `${environment.endPoint}/dossier/${clientCompanyId}/balance-sheet?type=${typeForm}`,
      body
    );
  }

  private rebuildFormOne(form: any) {
    return form.reduce(
      (objectForm: any, balanceSheet: any) => {
        const {
          template: { code },
        } = balanceSheet;

        if (`${code}`.includes('11')) {
          objectForm.active.nonCurrentAssets.push(balanceSheet);
          return objectForm;
        }

        if (`${code}`.includes('12') || `${code}`.includes('1600')) {
          objectForm.active.currentAssets.push(balanceSheet);
          return objectForm;
        }

        if (`${code}`.includes('13')) {
          objectForm.passive.capitalAndReserves.push(balanceSheet);
          return objectForm;
        }

        if (`${code}`.includes('14')) {
          objectForm.passive.longTermLiabilities.push(balanceSheet);
          return objectForm;
        }

        if (`${code}`.includes('15') || `${code}`.includes('1700')) {
          objectForm.passive.currentLiabilities.push(balanceSheet);
          return objectForm;
        }
      },
      {
        active: {
          nonCurrentAssets: [],
          currentAssets: [],
        },
        passive: {
          capitalAndReserves: [],
          longTermLiabilities: [],
          currentLiabilities: [],
        },
      }
    );
  }
}
