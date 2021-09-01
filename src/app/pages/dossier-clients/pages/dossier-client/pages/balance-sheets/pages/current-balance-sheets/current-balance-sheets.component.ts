import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';
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
    zip(
      this.balanceSheetsService.getFormBalanceSheet(this.clientCompanyId, 1),
      this.balanceSheetsService.getFormBalanceSheet(this.clientCompanyId, 2)
    ).subscribe(([balanceSheetsFormOne, balanceSheetsFormTwo]) => {
      this.balanceSheetsFormOne = balanceSheetsFormOne;
      this.balanceSheetsFormTwo = balanceSheetsFormTwo;
    });
  }
}
