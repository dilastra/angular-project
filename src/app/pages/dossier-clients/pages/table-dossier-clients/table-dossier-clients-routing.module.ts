import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableDossierClientsComponent } from './table-dossier-clients.component';

const routes: Routes = [
  {
    path: '',
    component: TableDossierClientsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableDossierClientsRoutingModule {}
