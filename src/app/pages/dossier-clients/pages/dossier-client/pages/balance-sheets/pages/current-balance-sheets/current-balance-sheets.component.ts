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

  public objectForm: any = {
    nonCurrentAssets: [],
    currentAssets: [],
    capitalAndReserves: [],
    longTermLiabilities: [],
    currentLiabilities: [],
  };

  constructor(
    private route: ActivatedRoute,
    private balanceSheetsService: BalanceSheetsService
  ) {
    this.clientCompanyId = this.route.snapshot.params.id;
  }

  public ngOnInit(): void {
    this.balanceSheetsService
      .getFormBalanceSheet(this.clientCompanyId, 1)
      .subscribe((formBalanceSheet: any) => {
        formBalanceSheet.form.forEach((balanceSheet: any) => {
          const {
            template: { code },
          } = balanceSheet;

          if (`${code}`.includes('11')) {
            this.objectForm.nonCurrentAssets.push(balanceSheet);
            return;
          }

          if (`${code}`.includes('12') || `${code}`.includes('1600')) {
            this.objectForm.currentAssets.push(balanceSheet);
            return;
          }

          if (`${code}`.includes('13')) {
            this.objectForm.capitalAndReserves.push(balanceSheet);
            return;
          }

          if (`${code}`.includes('14')) {
            this.objectForm.longTermLiabilities.push(balanceSheet);
            return;
          }

          if (`${code}`.includes('15') || `${code}`.includes('1700')) {
            this.objectForm.currentLiabilities.push(balanceSheet);
            return;
          }
        });
      });
  }
}
