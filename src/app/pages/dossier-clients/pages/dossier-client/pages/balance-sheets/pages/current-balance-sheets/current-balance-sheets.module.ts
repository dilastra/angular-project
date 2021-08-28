import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentBalanceSheetsComponent } from './current-balance-sheets.component';
import { SharedModule } from 'src/app/core';
import { CurrentBalanceSheetsRoutingModule } from './current-balance-sheets-routing.module';
import { BalanceSheetsFormsModule } from '../../components';

@NgModule({
  declarations: [CurrentBalanceSheetsComponent],
  imports: [
    CommonModule,
    CurrentBalanceSheetsRoutingModule,
    SharedModule,
    BalanceSheetsFormsModule,
  ],
})
export class CurrentBalanceSheetsModule {}
