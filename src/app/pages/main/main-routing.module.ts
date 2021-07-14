import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'clients',
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('../clients/clients.module').then((m) => m.ClientsModule),
      },
      {
        path: 'dossier-clients',
        loadChildren: () =>
          import('../dossier-clients/dossier-clients.module').then(
            (m) => m.DossierClientsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
