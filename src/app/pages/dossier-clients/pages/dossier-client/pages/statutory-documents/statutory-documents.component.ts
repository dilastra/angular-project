import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Command,
  DossierService,
  LeaseContract,
  LoaderService,
  OrganizationRegistrationCertficate,
} from 'src/app/core';
import { File } from 'src/app/core';

@Component({
  selector: 'credex-statutory-documents',
  templateUrl: './statutory-documents.component.html',
  styleUrls: ['./statutory-documents.component.scss'],
})
export class StatutoryDocumentsComponent implements OnInit {
  public companyClientId: string = '';

  public companyCharter: File | null = null;

  public leaseAgreementPremises: LeaseContract | null = null;

  public appointmentSoleExecutiveBody: Command | null = null;

  public organizationRegistrationCertficate: OrganizationRegistrationCertficate | null =
    null;

  constructor(
    private route: ActivatedRoute,
    private dossierService: DossierService,
    private loader: LoaderService
  ) {}

  public ngOnInit(): void {
    this.loader.show();
    this.companyClientId = this.route.snapshot.params.id;

    this.dossierService
      .getDossierCompanyClient(this.companyClientId)
      .subscribe(({ file, command, lease_contract, org_reg_certificate }) => {
        this.companyCharter = file;
        this.appointmentSoleExecutiveBody = { ...command };
        this.leaseAgreementPremises = { ...lease_contract };
        this.organizationRegistrationCertficate = { ...org_reg_certificate };
        this.loader.hide();
      });
  }
}
