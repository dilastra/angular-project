import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/core';
import { StatutoryDocumentsComponent } from './statutory-documents.component';
import { StatutoryDocumentsRoutingModule } from './statutory-documents-routing.module';
import {
  AppointmentSoleExecutiveBodyComponent,
  CompanyСharterComponent,
} from './components';

@NgModule({
  declarations: [
    AppointmentSoleExecutiveBodyComponent,
    StatutoryDocumentsComponent,
    CompanyСharterComponent,
  ],
  imports: [CommonModule, SharedModule, StatutoryDocumentsRoutingModule],
})
export class StatutoryDocumentsModule {}
