import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DossierClientsComponent } from './dossier-clients.component';
import { DossierClientsRoutingModule } from './dossier-clients-routing.module';
import { SharedModule } from 'src/app/core';

@NgModule({
  declarations: [DossierClientsComponent],
  imports: [CommonModule, DossierClientsRoutingModule, SharedModule],
})
export class DossierClientsModule {}
