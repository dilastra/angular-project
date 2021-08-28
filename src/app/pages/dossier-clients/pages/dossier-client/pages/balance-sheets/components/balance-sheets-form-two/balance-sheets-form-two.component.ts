import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'credex-balance-sheets-form-two',
  templateUrl: './balance-sheets-form-two.component.html',
  styleUrls: ['./balance-sheets-form-two.component.scss'],
})
export class BalanceSheetsFormTwoComponent implements OnInit {
  @Input()
  public balanceSheetsFormTwo: any;

  constructor() {}

  ngOnInit(): void {}
}
