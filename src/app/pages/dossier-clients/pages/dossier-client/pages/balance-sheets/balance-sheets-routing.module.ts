import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceSheetsComponent } from './balance-sheets.component';

const routes: Routes = [
  {
    path: '',
    component: BalanceSheetsComponent,
    children: [
      { path: '', redirectTo: 'current', pathMatch: 'full' },
      {
        path: 'current',
        loadChildren: () =>
          import('./pages').then((m) => m.CurrentBalanceSheetsModule),
      },
      {
        path: 'archive',
        loadChildren: () =>
          import('./pages').then((m) => m.ArchiveBalanceSheetsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BalanceSheetsRoutingModule {}
