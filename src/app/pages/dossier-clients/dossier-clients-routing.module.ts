import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DossierClientsComponent } from './dossier-clients.component';

const routes: Routes = [
  {
    path: '',
    component: DossierClientsComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            './pages/table-dossier-clients/table-dossier-clients.module'
          ).then((m) => m.TableDossierClientsModule),
      },
      {
        path: 'dossier/:id',
        loadChildren: () =>
          import('./pages/dossier-client').then((m) => m.DossierClientModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DossierClientsRoutingModule {}
