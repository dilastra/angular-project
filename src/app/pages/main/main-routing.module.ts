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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
