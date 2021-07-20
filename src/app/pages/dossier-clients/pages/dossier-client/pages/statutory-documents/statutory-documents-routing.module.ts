import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StatutoryDocumentsComponent } from './statutory-documents.component';

const routes: Routes = [
  {
    path: '',
    component: StatutoryDocumentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatutoryDocumentsRoutingModule {}
