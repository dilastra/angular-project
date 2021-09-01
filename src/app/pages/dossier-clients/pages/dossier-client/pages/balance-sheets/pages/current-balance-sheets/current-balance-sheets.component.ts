import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BalanceSheetsService } from 'src/app/core';

@Component({
  selector: 'credex-current-balance-sheets',
  templateUrl: './current-balance-sheets.component.html',
  styleUrls: ['./current-balance-sheets.component.scss'],
})
export class CurrentBalanceSheetsComponent implements OnInit {
  public clientCompanyId: string;

  public balanceSheetsFormOne: any;
  public balanceSheetsFormTwo: any;

  constructor(
    private route: ActivatedRoute,
    private balanceSheetsService: BalanceSheetsService
  ) {
    this.clientCompanyId = this.route.snapshot.params.id;
  }

  public ngOnInit(): void {
    this.getBalanceSheetsFormOne().subscribe((balanceSheetsFormOne) => {
      this.balanceSheetsFormOne = balanceSheetsFormOne;
    });

    this.getBalanceSheetsFormTwo().subscribe((balanceSheetsFormTwo) => {
      this.balanceSheetsFormTwo = balanceSheetsFormTwo;
    });
  }

  public updateForm(typeForm: number) {
    if (typeForm === 1) {
      this.getBalanceSheetsFormOne().subscribe((balanceSheetsFormOne) => {
        this.balanceSheetsFormOne = balanceSheetsFormOne;
        return;
      });
    }

    if (typeForm === 2) {
      this.getBalanceSheetsFormTwo().subscribe((balanceSheetsFormTwo) => {
        this.balanceSheetsFormTwo = balanceSheetsFormTwo;
        return;
      });
    }
  }

  public getBalanceSheetsFormOne() {
    return this.balanceSheetsService.getFormBalanceSheet(
      this.clientCompanyId,
      1
    );
  }

  public getBalanceSheetsFormTwo() {
    return this.balanceSheetsService.getFormBalanceSheet(
      this.clientCompanyId,
      2
    );
  }
}
