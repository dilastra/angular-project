import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { Subscription } from 'rxjs';
import { DossierService, FilesService, LoaderService } from 'src/app/core';

@Component({
  selector: 'credex-lease-agreement-premises',
  templateUrl: './lease-agreement-premises.component.html',
  styleUrls: ['./lease-agreement-premises.component.scss'],
})
export class LeaseAgreementPremisesComponent implements OnInit, OnDestroy {
  @Input()
  public companyClientId: string = '';

  @Input() set leaseAgreementPremises(leaseAgreementPremises: object) {
    if (leaseAgreementPremises) {
      const { date_from, date_signing, date_to, doc_number, file }: any =
        leaseAgreementPremises;
      this.leaseAgreementPremisesForm.patchValue({
        file: file,
        docNumber: doc_number,
        dateSigning: date_signing ? this.getTuiDayDate(date_signing) : null,
        dateFrom: date_from ? this.getTuiDayDate(date_from) : null,
        dateTo: date_to ? this.getTuiDayDate(date_to) : null,
      });
    }
  }

  public subscriptions: Subscription = new Subscription();

  public leaseAgreementPremisesForm: FormGroup;

  public isDownloadFile = false;

  public minDate = new TuiDay(0, 0, 1);

  public maxDate = new TuiDay(9999, 11, 31);

  public loadingFiles: any = [];

  constructor(
    private builder: FormBuilder,
    private dossierService: DossierService,
    private filesService: FilesService,
    private loader: LoaderService
  ) {
    this.leaseAgreementPremisesForm = this.builder.group({
      file: [null],
      docNumber: [null, Validators.required],
      dateSigning: [null, Validators.required],
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required],
    });
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.getControlLeaseAgreementPremises('file').valueChanges.subscribe(
        (file) => {
          if (file && !file?.id) {
            this.loader.show();
            this.loadingFiles = [file];
            this.subscriptions.add(
              this.filesService
                .uploadFile(file)
                .subscribe(({ id, name, size, type }: any) => {
                  this.getControlLeaseAgreementPremises('file').patchValue({
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
                  this.leaseAgreementPremisesForm.reset();
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

  public getTuiDayDate(date: string): TuiDay {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    return new TuiDay(year, month, day);
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public getControlLeaseAgreementPremises(nameControl: string) {
    return this.leaseAgreementPremisesForm.controls[nameControl];
  }

  public sendFileId(
    companyClientId: string,
    file: any | null = {
      file_id: null,
      doc_number: '',
      date_from: '',
      date_to: '',
    }
  ) {
    return this.dossierService.updateleaseAgreementPremises(
      companyClientId,
      file
    );
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

  public onSave() {
    this.loader.show();
    const { file, docNumber, dateSigning, dateFrom, dateTo } =
      this.leaseAgreementPremisesForm.value;

    const model = {
      file_id: file.id,
      doc_number: docNumber,
      date_signing: dateSigning.toJSON(),
      date_from: dateFrom.toJSON(),
      date_to: dateTo.toJSON(),
    };
    this.sendFileId(this.companyClientId, model).subscribe(() => {
      this.loader.hide();
    });
  }
}
