import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core';
import { StatutoryDocumentsComponent } from './statutory-documents.component';
import { StatutoryDocumentsRoutingModule } from './statutory-documents-routing.module';
import {
  AppointmentSoleExecutiveBodyComponent,
  Company–°harterComponent,
  LeaseAgreementPremisesComponent,
  OrganizationRegistrationCertificateComponent,
  TransferActRentPermiseComponent,
} from './components';

@NgModule({
  declarations: [
    AppointmentSoleExecutiveBodyComponent,
    Company–°harterComponent,
    LeaseAgreementPremisesComponent,
    OrganizationRegistrationCertificateComponent,
    StatutoryDocumentsComponent,
    TransferActRentPermiseComponent,
  ],
  imports: [CommonModule, SharedModule, StatutoryDocumentsRoutingModule],
})
export class StatutoryDocumentsModule {}
