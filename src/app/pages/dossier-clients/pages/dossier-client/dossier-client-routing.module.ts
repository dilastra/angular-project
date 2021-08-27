import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DossierClientComponent } from './dossier-client.component';

const routes: Routes = [
  {
    path: '',
    component: DossierClientComponent,
    children: [
      {
        path: '',
        redirectTo: 'statutory-documents',
        pathMatch: 'full',
      },
      {
        path: 'statutory-documents',
        loadChildren: () =>
          import('./pages/statutory-documents').then(
            (m) => m.StatutoryDocumentsModule
          ),
      },
      {
        path: 'beneficiaries',
        loadChildren: () =>
          import('./pages/beneficiaries').then((m) => m.BeneficiariesModule),
      },
      {
        path: 'questionnaire',
        loadChildren: () =>
          import('./pages/questionnaire').then((m) => m.QuestionnaireModule),
      },
      {
        path: 'balance-sheets',
        loadChildren: () =>
          import('./pages/balance-sheets').then((m) => m.BalanceSheetsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DossierClientRoutingModule {}
