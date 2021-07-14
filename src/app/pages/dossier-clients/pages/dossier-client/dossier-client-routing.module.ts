import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DossierClientComponent } from './dossier-client.component';

const routes: Routes = [
  {
    path: '',
    component: DossierClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DossierClientRoutingModule {}
