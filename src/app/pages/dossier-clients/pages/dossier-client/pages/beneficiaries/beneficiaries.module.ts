import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiariesComponent } from './beneficiaries.component';
import { SharedModule } from 'src/app/core';
import { BeneficiariesRoutingModule } from './beneficiaries-routing.module';
import { BeneficiaryComponent } from './components';
import {
  PassportComponent,
  SnilsComponent,
} from './components/beneficiary/components';
import {
  FirstPagePassportComponent,
  PlaceResidenceComponent,
} from './components/beneficiary/components/passport/components';

@NgModule({
  declarations: [
    BeneficiariesComponent,
    BeneficiaryComponent,
    FirstPagePassportComponent,
    PassportComponent,
    PlaceResidenceComponent,
    SnilsComponent,
  ],
  imports: [CommonModule, BeneficiariesRoutingModule, SharedModule],
})
export class BeneficiariesModule {}
