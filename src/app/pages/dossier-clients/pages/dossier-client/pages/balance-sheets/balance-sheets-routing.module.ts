import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceSheetsComponent } from './balance-sheets.component';

const routes: Routes = [
  {
    path: '',
    component: BalanceSheetsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalanceSheetsRoutingModule {}
