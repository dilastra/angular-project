import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DossierClientComponent } from './dossier-client.component';
import { SharedModule } from 'src/app/core';
import { DossierClientRoutingModule } from './dossier-client-routing.module';

@NgModule({
  declarations: [DossierClientComponent],
  imports: [CommonModule, DossierClientRoutingModule, SharedModule],
})
export class DossierClientModule {}
