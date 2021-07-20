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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DossierClientRoutingModule {}
