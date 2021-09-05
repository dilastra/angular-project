import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import {
  DossierService,
  FilesService,
  LoaderService,
  File,
} from 'src/app/core';
@Component({
  selector: 'credex-company-charter',
  templateUrl: './company-charter.component.html',
  styleUrls: ['./company-charter.component.scss'],
})
export class CompanyСharterComponent implements OnInit {
  @Input()
  public companyClientId: string = '';

  @Input() set companyCharter(companyCharter: File | null) {
    if (companyCharter?.id)
      this.staturyDocumentsForm.patchValue(
        { file: companyCharter },
        { emitEvent: false }
      );
  }

  public isDownloadFile = false;

  public loadingFiles = [];

  public staturyDocumentsForm: FormGroup;

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
    this.getControlStaturyDocumentsForm('file').valueChanges.subscribe(
      (file) => {
        if (file && !file?.id) {
          this.loader.show();

          this.filesService
            .uploadFile(file)
            .subscribe(({ id, name, size, type }: any) => {
              this.getControlStaturyDocumentsForm('file').patchValue({
                id,
                name,
                size,
                type,
              });

              this.sendFileId(this.companyClientId, id).subscribe(() => {
                this.loadingFiles = [];
                this.loader.hide();
              });
            });
        } else if (!file) {
          this.loader.show();

          this.sendFileId(this.companyClientId).subscribe(
            () => {
              this.loadingFiles = [];
              this.loader.hide();
            },
            () => {
              this.loader.hide();
            }
          );
        }
      }
    );
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
