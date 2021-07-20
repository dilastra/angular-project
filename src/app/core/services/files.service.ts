import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResultDialogComponent } from '../dialogs';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(
    private http: HttpClient,
    private dialogService: TuiDialogService,
    private injector: Injector
  ) {}

  public uploadFile(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${environment.endPoint}/upload`, formData);
  }

  private gettingFile(fileid: any): Observable<any> {
    return this.http.get<any>(`${environment.endPoint}/upload/${fileid}`, {
      responseType: 'blob' as 'json',
    });
  }

  public downloadFile(formControl: AbstractControl) {
    formControl.disable();
    const { id, name } = formControl.value;
    return this.gettingFile(id).pipe(
      mergeMap((file) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob([file], { type: file.type })
        );
        downloadLink.setAttribute('download', name);
        downloadLink.click();
        return of({ isDownloaded: true });
      }),
      catchError((error) => {
        console.log(error);
        const dataForDialog = {
          title: 'Операция не была проведена',
          desc: 'Файл не был скачен. Попробуйте позже.',
        };
        this.onResult(dataForDialog).subscribe();
        return throwError(error);
      })
    );
  }

  private onResult({ title, desc }: { title: string; desc: string }) {
    return this.dialogService.open(
      new PolymorpheusComponent(ResultDialogComponent, this.injector),
      {
        dismissible: true,
        closeable: false,
        data: {
          title,
          desc,
        },
      }
    );
  }
}
