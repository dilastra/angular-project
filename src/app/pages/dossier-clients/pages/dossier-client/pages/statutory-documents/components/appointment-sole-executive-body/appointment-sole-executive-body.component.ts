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
import { distinctUntilChanged } from 'rxjs/operators';
import {
  Command,
  DossierService,
  FilesService,
  LoaderService,
} from 'src/app/core';

@Component({
  selector: 'credex-appointment-sole-executive-body',
  templateUrl: './appointment-sole-executive-body.component.html',
  styleUrls: ['./appointment-sole-executive-body.component.scss'],
})
export class AppointmentSoleExecutiveBodyComponent
  implements OnInit, OnDestroy
{
  @Input()
  public companyClientId: string = '';

  @Input() set appointmentSoleExecutiveBody(
    appointmentSoleExecutiveBody: Command | null
  ) {
    if (appointmentSoleExecutiveBody?.file) {
      const { date_from, date_to, doc_number, file } =
        appointmentSoleExecutiveBody;
      this.appointmentSoleExecutiveBodyForm.patchValue(
        {
          numberOfAppointmentSoleExecutiveBody: doc_number,
          fileAppointmentSoleExecutiveBody: file,
          dateFrom: date_from ? this.getTuiDayDate(date_from) : null,
          dateTo: date_to ? this.getTuiDayDate(date_to) : null,
        },
        { emitEvent: false }
      );
    }
  }

  public isDownloadFile = false;

  public minDate = new TuiDay(0, 0, 1);

  public maxDate = new TuiDay(9999, 11, 31);

  public loadingFiles: any[] = [];

  public appointmentSoleExecutiveBodyForm: FormGroup;

  public subscriptions: Subscription = new Subscription();

  constructor(
    private builder: FormBuilder,
    private dossierService: DossierService,
    private filesService: FilesService,
    private loader: LoaderService
  ) {
    this.appointmentSoleExecutiveBodyForm = this.builder.group({
      numberOfAppointmentSoleExecutiveBody: [null, [Validators.required]],
      fileAppointmentSoleExecutiveBody: [null, [Validators.required]],
      dateFrom: [null, [Validators.required]],
      dateTo: [null, [Validators.required]],
    });
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.getControlAppointmentSoleExecutiveBodyForm(
        'fileAppointmentSoleExecutiveBody'
      )
        .valueChanges.pipe(distinctUntilChanged())
        .subscribe((file) => {
          if (file && !file?.id) {
            this.loader.show();
            this.loadingFiles = [file];
            this.subscriptions.add(
              this.filesService
                .uploadFile(file)
                .subscribe(({ id, name, size, type }: any) => {
                  this.getControlAppointmentSoleExecutiveBodyForm(
                    'fileAppointmentSoleExecutiveBody'
                  ).patchValue({
                    id,
                    name,
                    size,
                    type,
                  });

                  this.sendFileId(this.companyClientId, {
                    file_id: id,
                  }).subscribe(() => {
                    this.loader.hide();
                    this.loadingFiles = [];
                  });
                })
            );
          } else if (!file) {
            this.loader.show();
            this.subscriptions.add(
              this.sendFileId(this.companyClientId).subscribe(
                () => {
                  this.appointmentSoleExecutiveBodyForm.reset();
                  this.loader.hide();
                },
                (error) => {
                  this.loader.hide();
                }
              )
            );
          }
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getControlAppointmentSoleExecutiveBodyForm(
    nameControl: string
  ): FormControl {
    return this.appointmentSoleExecutiveBodyForm.controls[
      nameControl
    ] as FormControl;
  }

  public downloadFile(formControl: FormControl) {
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

  public getTuiDayDate(date: string): TuiDay {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    return new TuiDay(year, month, day);
  }

  public sendFileId(companyClientId: string, file: any | object = {}) {
    return this.dossierService.updateAppointmentSoleExecutiveBodyCompanyClient(
      companyClientId,
      file
    );
  }

  public onSave() {
    this.loader.show();
    const {
      dateFrom,
      dateTo,
      numberOfAppointmentSoleExecutiveBody,
      fileAppointmentSoleExecutiveBody,
    }: {
      dateFrom: TuiDay;
      dateTo: TuiDay;
      numberOfAppointmentSoleExecutiveBody: string;
      fileAppointmentSoleExecutiveBody: any;
    } = this.appointmentSoleExecutiveBodyForm.value;
    const date_from = dateFrom.toJSON();
    const date_to = dateTo.toJSON();
    const model = {
      file_id: fileAppointmentSoleExecutiveBody.id,
      doc_number: numberOfAppointmentSoleExecutiveBody,
      date_from,
      date_to,
    };

    this.sendFileId(this.companyClientId, model).subscribe(
      () => {
        this.loader.hide();
      },
      () => {
        this.loader.hide();
      }
    );
  }
}
