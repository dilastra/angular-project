import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';
import { BalanceSheetsService, LoaderService } from 'src/app/core';

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
    private balanceSheetsService: BalanceSheetsService,
    private loader: LoaderService
  ) {
    this.clientCompanyId = this.route.snapshot.params.id;
  }

  public ngOnInit(): void {
    this.loader.show();
    zip(
      this.getBalanceSheetsFormOne(),
      this.getBalanceSheetsFormTwo()
    ).subscribe(([balanceSheetsFormOne, balanceSheetsFormTwo]) => {
      this.balanceSheetsFormOne = balanceSheetsFormOne;
      this.balanceSheetsFormTwo = balanceSheetsFormTwo;
      this.loader.hide();
    });
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
}
