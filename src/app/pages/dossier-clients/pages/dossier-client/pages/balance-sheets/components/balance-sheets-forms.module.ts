import { NgModule } from '@angular/core';
import { SharedModule, TuiModule } from 'src/app/core';
import { BalanceSheetsFormOneComponent } from './balance-sheets-form-one';
import { BalanceSheetsFormTwoComponent } from './balance-sheets-form-two';
import { BalanceSheetsFormsComponent } from './balance-sheets-forms';

@NgModule({
  declarations: [
    BalanceSheetsFormOneComponent,
    BalanceSheetsFormTwoComponent,
    BalanceSheetsFormsComponent,
  ],
  imports: [TuiModule, SharedModule],
  exports: [
    BalanceSheetsFormOneComponent,
    BalanceSheetsFormTwoComponent,
    BalanceSheetsFormsComponent,
  ],
})
export class BalanceSheetsFormsModule {}
