import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'credex-balance-sheets-form-one',
  templateUrl: './balance-sheets-form-one.component.html',
  styleUrls: ['./balance-sheets-form-one.component.scss'],
})
export class BalanceSheetsFormOneComponent implements OnInit {
  @Input()
  public balanceSheetsFormOne: any;

  constructor() {}

  ngOnInit(): void {}
}
