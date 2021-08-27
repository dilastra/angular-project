import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveBalanceSheetsComponent } from './archive-balance-sheets.component';

const routes: Routes = [
  {
    path: '',
    component: ArchiveBalanceSheetsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchiveBalanceSheetsRoutingModule {}
