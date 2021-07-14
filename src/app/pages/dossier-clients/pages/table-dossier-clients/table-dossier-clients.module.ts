import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDossierClientsRoutingModule } from './table-dossier-clients-routing.module';
import { TableDossierClientsComponent } from './table-dossier-clients.component';
import { SharedModule } from 'src/app/core';

@NgModule({
  declarations: [TableDossierClientsComponent],
  imports: [CommonModule, TableDossierClientsRoutingModule, SharedModule],
})
export class TableDossierClientsModule {}
