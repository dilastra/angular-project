import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core';
import { ArchiveBalanceSheetsComponent } from './archive-balance-sheets.component';
import { ArchiveBalanceSheetsRoutingModule } from './archive-balance-sheets-routing.module';

@NgModule({
  declarations: [ArchiveBalanceSheetsComponent],
  imports: [ArchiveBalanceSheetsRoutingModule, CommonModule, SharedModule],
})
export class ArchiveBalanceSheetsModule {}
