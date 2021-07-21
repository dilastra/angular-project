import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiFileLike } from '@taiga-ui/kit';
import { Subscription } from 'rxjs';
import { DossierService, FilesService, LoaderService } from 'src/app/core';

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

  @Input() set appointmentSoleExecutiveBody(appointmentSoleExecutiveBody: any) {
    if (appointmentSoleExecutiveBody) {
      const { date_from, date_to, doc_number, file } =
        appointmentSoleExecutiveBody;
      this.appointmentSoleExecutiveBodyForm.patchValue({
        numberOfAppointmentSoleExecutiveBody: doc_number,
        fileAppointmentSoleExecutiveBody: file,
        dateFrom: this.getTuiDayDate(date_from),
        dateTo: this.getTuiDayDate(date_to),
      });
    }
  }

  public isDownloadFile = false;

  public minDate = new TuiDay(0, 0, 1);

  public maxDate = new TuiDay(9999, 11, 31);

  public loadingFiles: any = [];

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
      ).valueChanges.subscribe((file) => {
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
                this.appointmentSoleExecutiveBodyForm.reset();
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getControlAppointmentSoleExecutiveBodyForm(nameControl: string) {
    return this.appointmentSoleExecutiveBodyForm.controls[nameControl];
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

  public getTuiDayDate(date: string): TuiDay {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    return new TuiDay(year, month, day);
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

    this.sendFileId(this.companyClientId, model).subscribe(() => {
      this.loader.hide();
    });
  }
}
