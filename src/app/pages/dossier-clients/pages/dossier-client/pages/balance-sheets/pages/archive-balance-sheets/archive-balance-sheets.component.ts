import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { zip } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BalanceSheetsService, LoaderService } from 'src/app/core';

@Component({
  selector: 'credex-archive-balance-sheets',
  templateUrl: './archive-balance-sheets.component.html',
  styleUrls: ['./archive-balance-sheets.component.scss'],
  providers: [TuiDestroyService],
})
export class ArchiveBalanceSheetsComponent implements OnInit {
  public clientCompanyId: string;

  public balanceSheetsFormOne: any;

  public balanceSheetsFormTwo: any;

  public periods: any[] = [];

  public periodControl = new FormControl(null);

  constructor(
    private route: ActivatedRoute,
    private balanceSheetsService: BalanceSheetsService,
    private loader: LoaderService,
    private destroy$: TuiDestroyService
  ) {
    this.clientCompanyId = this.route.snapshot.params.id;
  }

  public ngOnInit(): void {
    this.loader.show();
    this.balanceSheetsService
      .getFormsFromArchive(this.clientCompanyId, 1)
      .subscribe((archiveFormsOne: any[]) => {
        console.log(archiveFormsOne);
        this.periods = archiveFormsOne;
        this.loader.hide();
      });

    this.periodControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ({
          id,
          date_quarter: date_quarter_form_one,
          date_year: date_year_form_one,
        }: any) => {
          this.loader.show();
          this.balanceSheetsService
            .getFormFromArchive(this.clientCompanyId, id, 1)
            .subscribe((balanceSheetsFormOne) => {
              this.balanceSheetsFormOne = balanceSheetsFormOne;
            });

          this.balanceSheetsService
            .getFormsFromArchive(this.clientCompanyId, 2)
            .subscribe((formsTwoFromArchive) => {
              const formTwoFromArchive = formsTwoFromArchive.find(
                ({
                  date_quarter: date_quarter_form_two,
                  date_year: date_year_form_two,
                }: any) => {
                  return (
                    date_quarter_form_two == date_quarter_form_one &&
                    date_year_form_one == date_year_form_two
                  );
                }
              );

              if (formTwoFromArchive) {
                this.balanceSheetsService
                  .getFormFromArchive(
                    this.clientCompanyId,
                    formTwoFromArchive.id,
                    2
                  )
                  .subscribe((balanceSheetsFormTwo) => {
                    this.balanceSheetsFormTwo = balanceSheetsFormTwo;
                    this.loader.hide();
                  });
              }
            });
        }
      );
  }

  public updateForm(typeForm: number) {
    this.loader.show();
    if (typeForm === 1) {
      this.getBalanceSheetsFormOne().subscribe((balanceSheetsFormOne) => {
        this.balanceSheetsFormOne = balanceSheetsFormOne;
        this.loader.hide();
        return;
      });
    }

    if (typeForm === 2) {
      this.getBalanceSheetsFormTwo().subscribe((balanceSheetsFormTwo) => {
        this.balanceSheetsFormTwo = balanceSheetsFormTwo;
        this.loader.hide();
        return;
      });
    }
  }

  public getBalanceSheetsFormOne() {
    return this.balanceSheetsService.getForm(this.clientCompanyId, 1);
  }

  public getBalanceSheetsFormTwo() {
    return this.balanceSheetsService.getForm(this.clientCompanyId, 2);
  }

  public getFormatedDate(date: string): string {
    const dayOfMonth = new Date(date.slice(0, -5)).getDate();
    const month = new Date(date.slice(0, -5)).getMonth() + 1;
    const year = new Date(date.slice(0, -5)).getFullYear();

    return `${dayOfMonth}.${month}.${year}`;
  }

  public getValueForPeriodSelect(selectedValue: any): string {
    return `${this.getFormatedDate(
      selectedValue?.date_quarter
    )}-${this.getFormatedDate(selectedValue?.date_year)}`;
  }
}
