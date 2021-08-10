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
import {
  DossierService,
  FilesService,
  LoaderService,
  OwnershipType,
} from 'src/app/core';

@Component({
  selector: 'credex-lease-agreement-premises',
  templateUrl: './lease-agreement-premises.component.html',
  styleUrls: ['./lease-agreement-premises.component.scss'],
})
export class LeaseAgreementPremisesComponent implements OnInit, OnDestroy {
  @Input()
  public companyClientId: string = '';

  @Input() set leaseAgreementPremises(leaseAgreementPremises: any) {
    if (leaseAgreementPremises?.file) {
      const {
        date_from,
        date_signing,
        date_to,
        doc_number,
        file,
        ownership_type,
      }: any = leaseAgreementPremises;
      this.leaseAgreementPremisesForm.patchValue(
        {
          file: file,
          docNumber: doc_number,
          ownershipType: ownership_type,
          dateSigning: date_signing ? this.getTuiDayDate(date_signing) : null,
          dateFrom: date_from ? this.getTuiDayDate(date_from) : null,
          dateTo: date_to ? this.getTuiDayDate(date_to) : null,
        },
        { emitEvent: false }
      );
    }
  }

  public subscriptions: Subscription = new Subscription();

  public leaseAgreementPremisesForm: FormGroup;

  public isDownloadFile = false;

  public ownershipTypes = OwnershipType;

  public nameOwnershipType = '';

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
      dateSigning: [null],
      ownershipType: [null, Validators.required],
      dateFrom: [null, Validators.required],
      dateTo: [null],
    });
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.getFormControl('file')
        .valueChanges.pipe(distinctUntilChanged())
        .subscribe((file) => {
          if (file && !file?.id) {
            this.loader.show();
            this.loadingFiles = [file];
            this.subscriptions.add(
              this.filesService
                .uploadFile(file)
                .subscribe(({ id, name, size, type }: any) => {
                  this.getFormControl('file').patchValue({
                    id,
                    name,
                    size,
                    type,
                  });
                  const model: any = {
                    file_id: id,
                    doc_number: null,
                    ownership_type: this.getFormControl('ownershipType').value,
                    date_from: null,
                    dateSigning: null,
                    dateTo: null,
                  };

                  this.subscriptions.add(
                    this.sendFileId(this.companyClientId, model).subscribe(
                      () => {
                        this.loadingFiles = [];
                        this.loader.hide();
                      },
                      () => {
                        this.loader.hide();
                      }
                    )
                  );
                })
            );
          } else if (!file) {
            this.loader.show();
            this.subscriptions.add(
              this.sendFileId(this.companyClientId).subscribe(
                () => {
                  this.loader.hide();
                },
                () => {
                  this.loader.hide();
                }
              )
            );
          }
        })
    );

    this.subscriptions.add(
      this.getFormControl('ownershipType')
        .valueChanges.pipe(distinctUntilChanged())
        .subscribe((selectedValue) => {
          const fileControl = this.getFormControl('file');
          switch (selectedValue) {
            case 0:
              if (fileControl.value) {
                this.leaseAgreementPremisesForm.reset({ ownershipType: 0 });
              }
              this.leaseAgreementPremisesForm.controls[
                'dateSigning'
              ].setValidators(Validators.required);
              this.leaseAgreementPremisesForm.controls['dateTo'].setValidators(
                Validators.required
              );
              this.leaseAgreementPremisesForm.controls['dateSigning'].setErrors(
                null
              );
              this.leaseAgreementPremisesForm.controls[
                'dateTo'
              ].updateValueAndValidity();
              break;
            case 1:
              if (fileControl.value) {
                this.leaseAgreementPremisesForm.reset({ ownershipType: 1 });
              }
              this.leaseAgreementPremisesForm.controls[
                'dateSigning'
              ].clearValidators();
              this.leaseAgreementPremisesForm.controls[
                'dateSigning'
              ].updateValueAndValidity();
              this.leaseAgreementPremisesForm.controls[
                'dateTo'
              ].clearValidators();
              this.leaseAgreementPremisesForm.controls[
                'dateTo'
              ].updateValueAndValidity();
              break;
            default:
              if (fileControl.value) {
                this.leaseAgreementPremisesForm.reset();
                this.leaseAgreementPremisesForm.clearValidators();
                this.leaseAgreementPremisesForm.updateValueAndValidity();
              }
              break;
          }
        })
    );
  }

  public isSelectLeaseHold() {
    return this.getFormControl('ownershipType').value === 0;
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

  public getFormControl(nameControl: string) {
    return this.leaseAgreementPremisesForm.controls[nameControl];
  }

  public getNameOwnershipType(): string {
    const selectedValue = this.getFormControl('ownershipType').value;
    return selectedValue !== null ? this.ownershipTypes[selectedValue] : '';
  }

  public sendFileId(companyClientId: string, file: any | object = {}) {
    return this.dossierService.updateLeaseAgreementPremises(
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
    const { file, docNumber, dateSigning, dateFrom, dateTo, ownershipType } =
      this.leaseAgreementPremisesForm.value;

    const model: any = {
      file_id: file.id,
      doc_number: docNumber,
      ownership_type: ownershipType,
      date_from: dateFrom.toJSON(),
    };

    if (dateSigning) model.date_signing = dateSigning.toJSON();
    if (dateTo) model.date_to = dateTo.toJSON();
    this.sendFileId(this.companyClientId, model).subscribe(() => {
      this.loader.hide();
    });
  }
}
