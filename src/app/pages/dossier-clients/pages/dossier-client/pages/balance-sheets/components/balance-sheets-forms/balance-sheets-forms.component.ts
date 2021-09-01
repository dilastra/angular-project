import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'credex-balance-sheets-forms',
  templateUrl: './balance-sheets-forms.component.html',
  styleUrls: ['./balance-sheets-forms.component.scss'],
})
export class BalanceSheetsFormsComponent {
  @Input()
  public balanceSheetsFormOne: any;

  @Input()
  public balanceSheetsFormTwo: any;

  @Input()
  public clientCompanyId: any;

  @Output()
  public onUpdateForm = new EventEmitter();

  public updateForm(typeForm: number) {
    this.onUpdateForm.emit(typeForm);
  }
}
