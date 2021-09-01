import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  BalanceSheetsService,
  FilesService,
  LoaderService,
} from 'src/app/core';

@Component({
  selector: 'credex-balance-sheets-form-one',
  templateUrl: './balance-sheets-form-one.component.html',
  styleUrls: ['./balance-sheets-form-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceSheetsFormOneComponent implements OnInit {
  @Input()
  public balanceSheetsFormOne: any;

  @Input()
  public clientCompanyId: any;

  @Output()
  public onChangeValue = new EventEmitter();

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

  public ngOnInit(): void {
    const { file, date_year, date_quarter, form } = this.balanceSheetsFormOne;
    this.balanceSheets = form;

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
                .changeFileFormBalanceSheet(this.clientCompanyId, 1, {
                  file_id: id,
                })
                .subscribe(console.log);
              this.loader.hide();
            });
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

  public onValueChange(
    newValue: number,
    code: number,
    indexValue: number,
    values: number[],
    balanceSheets = []
  ) {
    const copyValue = [...values];

    copyValue[indexValue] = newValue;

    this.balanceSheetsService
      .changeValueFormBalanceSheet(this.clientCompanyId, 1, {
        code,
        value: copyValue,
      })
      .subscribe(() => {});
  }
}
