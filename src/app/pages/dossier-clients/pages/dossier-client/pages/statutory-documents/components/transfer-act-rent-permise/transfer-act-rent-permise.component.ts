import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { DossierService, FilesService, LoaderService } from 'src/app/core';

@Component({
  selector: 'credex-transfer-act-rent-permise',
  templateUrl: './transfer-act-rent-permise.component.html',
  styleUrls: ['./transfer-act-rent-permise.component.scss'],
})
export class TransferActRentPermiseComponent implements OnInit {
  @Input()
  public dateSigningContract: TuiDay = new TuiDay(0, 0, 1);

  public loadingFiles = [];

  public isDownloadFile = false;

  public transferActRentPermiseForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private dossierService: DossierService,
    private filesService: FilesService,
    private loader: LoaderService
  ) {
    this.transferActRentPermiseForm = this.builder.group({
      file: [null],
      docNumber: [null, Validators.required],
      dateSigning: [null, Validators.required],
    });
  }

  public ngOnInit(): void {}

  public getFormControl(nameControl: string) {
    return this.transferActRentPermiseForm.controls[nameControl];
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

  public onSave() {}
}
