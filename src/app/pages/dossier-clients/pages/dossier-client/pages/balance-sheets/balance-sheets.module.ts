import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceSheetsRoutingModule } from './balance-sheets-routing.module';
import { SharedModule } from 'src/app/core';
import { BalanceSheetsComponent } from './balance-sheets.component';

@NgModule({
  declarations: [BalanceSheetsComponent],
  imports: [CommonModule, BalanceSheetsRoutingModule, SharedModule],
})
export class BalanceSheetsModule {}
