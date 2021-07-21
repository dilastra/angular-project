import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core';
import { StatutoryDocumentsComponent } from './statutory-documents.component';
import { StatutoryDocumentsRoutingModule } from './statutory-documents-routing.module';
import {
  AppointmentSoleExecutiveBodyComponent,
  CompanyСharterComponent,
  LeaseAgreementPremisesComponent,
  OrganizationRegistrationCertificateComponent,
} from './components';

@NgModule({
  declarations: [
    AppointmentSoleExecutiveBodyComponent,
    CompanyСharterComponent,
    LeaseAgreementPremisesComponent,
    OrganizationRegistrationCertificateComponent,
    StatutoryDocumentsComponent,
  ],
  imports: [CommonModule, SharedModule, StatutoryDocumentsRoutingModule],
})
export class StatutoryDocumentsModule {}
