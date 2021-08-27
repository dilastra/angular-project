import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentBalanceSheetsComponent } from './current-balance-sheets.component';

const routes: Routes = [
  {
    path: '',
    component: CurrentBalanceSheetsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentBalanceSheetsRoutingModule {}
