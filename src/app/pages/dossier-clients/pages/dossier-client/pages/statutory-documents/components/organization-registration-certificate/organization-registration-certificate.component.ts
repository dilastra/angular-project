import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { DossierService, FilesService, LoaderService } from 'src/app/core';

@Component({
  selector: 'credex-organization-registration-certificate',
  templateUrl: './organization-registration-certificate.component.html',
  styleUrls: ['./organization-registration-certificate.component.scss'],
})
export class OrganizationRegistrationCertificateComponent
  implements OnInit, OnDestroy
{
  @Input()
  public companyClientId: string = '';

  @Input() set organizationRegistrationCertficate(
    organizationRegistrationCertficate: any
  ) {
    if (organizationRegistrationCertficate?.file) {
      const { file, doc_number, date } = organizationRegistrationCertficate;
      this.organizationRegistrationCertificateForm.patchValue({
        file: file,
        docNumber: doc_number,
        dateRegistration: date ? this.getTuiDayDate(date) : null,
      });
    }
  }

  public organizationRegistrationCertificateForm: FormGroup;

  public isDownloadFile = false;

  public loadingFiles: any = [];

  public subscriptions: Subscription = new Subscription();

  constructor(
    private builder: FormBuilder,
    private dossierService: DossierService,
    private filesService: FilesService,
    private loader: LoaderService
  ) {
    this.organizationRegistrationCertificateForm = this.builder.group({
      file: [null],
      docNumber: [null, Validators.required],
      dateRegistration: [null, Validators.required],
    });
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.getControlOrganizationRegistrationCertificateForm('file')
        .valueChanges.pipe(distinctUntilChanged())
        .subscribe((file) => {
          if (file && !file?.id) {
            this.loader.show();
            this.loadingFiles = [file];
            this.subscriptions.add(
              this.filesService
                .uploadFile(file)
                .subscribe(({ id, name, size, type }: any) => {
                  this.getControlOrganizationRegistrationCertificateForm(
                    'file'
                  ).patchValue({
                    id,
                    name,
                    size,
                    type,
                  });
                  this.loader.hide();
                  this.loadingFiles = [];
                })
            );
          } else if (!file) {
            this.loader.show();
            this.subscriptions.add(
              this.sendFileId(this.companyClientId).subscribe(
                () => {
                  this.loader.hide();
                  this.organizationRegistrationCertificateForm.reset();
                },
                () => {
                  this.loader.hide();
                }
              )
            );
          }
        })
    );
  }

  public getTuiDayDate(date: string): TuiDay {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    return new TuiDay(year, month, day);
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public getControlOrganizationRegistrationCertificateForm(
    nameControl: string
  ) {
    return this.organizationRegistrationCertificateForm.controls[nameControl];
  }

  public downloadFile(formControl: AbstractControl) {
    this.isDownloadFile = true;
    this.filesService.downloadFile(formControl).subscribe(
      ({ isDownloaded }) => {
        if (isDownloaded) this.isDownloadFile = false;
      },
      () => {
        this.isDownloadFile = false;
      }
    );
  }

  public sendFileId(
    companyClientId: string,
    file: any | null = {
      file_id: null,
      doc_number: '',
      date: '',
    }
  ) {
    return this.dossierService.updateOrgRedCertificate(companyClientId, {
      ...file,
    });
  }

  public onSave() {
    this.loader.show();
    const { file, docNumber, dateRegistration }: any =
      this.organizationRegistrationCertificateForm.value;

    const model = {
      file_id: file.id,
      doc_number: docNumber,
      date: dateRegistration,
    };

    this.sendFileId(this.companyClientId, model).subscribe(() => {
      this.loader.hide();
    });
  }
}
