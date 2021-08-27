import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceSheetsRoutingModule } from './balance-sheets-routing.module';
import { SharedModule } from 'src/app/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, BalanceSheetsRoutingModule, SharedModule],
})
export class BalanceSheetsModule {}
