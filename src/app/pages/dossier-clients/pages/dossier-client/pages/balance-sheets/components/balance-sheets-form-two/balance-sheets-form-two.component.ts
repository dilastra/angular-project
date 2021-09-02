import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  BalanceSheetsService,
  FilesService,
  LoaderService,
} from 'src/app/core';

@Component({
  selector: 'credex-balance-sheets-form-two',
  templateUrl: './balance-sheets-form-two.component.html',
  styleUrls: ['./balance-sheets-form-two.component.scss'],
})
export class BalanceSheetsFormTwoComponent implements OnInit {
  @Input()
  public balanceSheetsFormTwo: any;

  @Input()
  public clientCompanyId: any;

  @Output()
  public onUpdateForm = new EventEmitter();

  public columns = ['Indicator names', 'code', 'dateQuarter', 'dateYear'];

  public fileControl = new FormControl();

  public loadingFiles: any[] = [];

  public isDownloadFile = false;

  public dateQuarter: any;

  public dateYear: any;

  public balanceSheets: any;

  constructor(
    private loader: LoaderService,
    private filesService: FilesService,
    private balanceSheetsService: BalanceSheetsService
  ) {}

  ngOnInit(): void {
    const { file, date_year, date_quarter, form } = this.balanceSheetsFormTwo;
    this.balanceSheets = form;

    console.log(this.balanceSheets);

    this.dateQuarter = new Date(date_quarter.slice(0, -5));
    this.dateYear = new Date(date_year.slice(0, -5));
    this.fileControl.setValue(file, { emitEvent: false });
    this.fileControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((file: any) => {
        if (file && !file?.id) {
          this.loader.show();
          this.loadingFiles = [file];
          this.filesService
            .uploadFile(file)
            .subscribe(({ id, name, size, type }: any) => {
              this.fileControl.setValue(
                {
                  id,
                  name,
                  size,
                  type,
                },
                { emitEvent: false }
              );
              this.balanceSheetsService
                .changeFileFormBalanceSheet(this.clientCompanyId, 2, {
                  file_id: id,
                })
                .subscribe(() => {
                  this.onUpdateForm.emit(2);
                });
              this.loader.hide();
            });
        } else {
          this.balanceSheetsService
            .changeFileFormBalanceSheet(this.clientCompanyId, 2, {
              file_id: null,
            })
            .subscribe();
        }
      });
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

  public onValueChange(newValue: any, code: any, indexValue: any, values: any) {
    const index = this.balanceSheets.findIndex(
      ({ template }: any) => template.code === code
    );
    values[indexValue] = newValue;
    this.balanceSheets[index].value = values;

    this.balanceSheetsService
      .changeValueFormBalanceSheet(this.clientCompanyId, 2, {
        code,
        value: values,
      })
      .subscribe();
  }
}
