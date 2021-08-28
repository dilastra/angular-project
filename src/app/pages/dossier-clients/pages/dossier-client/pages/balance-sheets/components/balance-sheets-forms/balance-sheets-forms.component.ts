import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'credex-balance-sheets-forms',
  templateUrl: './balance-sheets-forms.component.html',
  styleUrls: ['./balance-sheets-forms.component.scss'],
})
export class BalanceSheetsFormsComponent implements OnInit {
  @Input()
  public balanceSheetsFormOne: any;

  @Input()
  public balanceSheetsFormTwo: any;

  constructor() {}

  ngOnInit(): void {}
}
