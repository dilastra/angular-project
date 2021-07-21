import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DossierService, FilesService, LoaderService } from 'src/app/core';

@Component({
  selector: 'credex-company-charter',
  templateUrl: './company-charter.component.html',
  styleUrls: ['./company-charter.component.scss'],
})
export class CompanyСharterComponent implements OnInit, OnDestroy {
  @Input()
  public companyClientId: string = '';

  @Input() set companyCharter(companyCharter: any) {
    if (companyCharter?.id)
      this.staturyDocumentsForm.patchValue({ file: companyCharter });
  }

  public isDownloadFile = false;

  public loadingFiles = [];

  public staturyDocumentsForm: FormGroup;

  public subscriptions: Subscription = new Subscription();

  constructor(
    private builder: FormBuilder,
    private dossierService: DossierService,
    private filesService: FilesService,
    private loader: LoaderService
  ) {
    this.staturyDocumentsForm = this.builder.group({
      file: [null],
    });
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.getControlStaturyDocumentsForm('file').valueChanges.subscribe(
        (file) => {
          if (file && !file?.id) {
            this.loader.show();
            this.subscriptions.add(
              this.filesService
                .uploadFile(file)
                .subscribe(({ id, name, size, type }: any) => {
                  this.getControlStaturyDocumentsForm('file').patchValue({
                    id,
                    name,
                    size,
                    type,
                  });
                  this.subscriptions.add(
                    this.sendFileId(this.companyClientId, id).subscribe(() => {
                      this.loadingFiles = [];
                      this.loader.hide();
                    })
                  );
                })
            );
          } else if (!file) {
            this.loader.show();
            this.subscriptions.add(
              this.sendFileId(this.companyClientId).subscribe(
                () => {
                  this.loadingFiles = [];
                  this.loader.hide();
                },
                () => {
                  this.loader.hide();
                }
              )
            );
          }
        }
      )
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public downloadFile(formControl: AbstractControl) {
    this.isDownloadFile = true;
    this.filesService.downloadFile(formControl).subscribe(
      ({ isDownloaded = false }) => {
        if (isDownloaded) this.isDownloadFile = false;
      },
      () => {
        this.isDownloadFile = false;
      }
    );
  }

  public getControlStaturyDocumentsForm(nameControl: string) {
    return this.staturyDocumentsForm.controls[nameControl];
  }

  public sendFileId(idCompanyClient: string, fileId: string | null = null) {
    return this.dossierService.updateConstituentDocumentsCompanyClient(
      idCompanyClient,
      {
        file_id: fileId,
      }
    );
  }
}
