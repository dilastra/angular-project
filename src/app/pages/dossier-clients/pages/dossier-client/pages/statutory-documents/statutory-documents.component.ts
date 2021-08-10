import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DossierService, LoaderService } from 'src/app/core';

@Component({
  selector: 'credex-statutory-documents',
  templateUrl: './statutory-documents.component.html',
  styleUrls: ['./statutory-documents.component.scss'],
})
export class StatutoryDocumentsComponent implements OnInit, OnDestroy {
  public companyClientId: string = '';

  public subscriptions: Subscription = new Subscription();

  public companyCharter: any = undefined;

  public leaseAgreementPremises: any = undefined;

  public appointmentSoleExecutiveBody: any = undefined;

  public organizationRegistrationCertficate: any = undefined;

  constructor(
    private route: ActivatedRoute,
    private dossierService: DossierService,
    private loader: LoaderService
  ) {}

  public ngOnInit(): void {
    this.loader.show();
    this.companyClientId = this.route.parent?.parent?.snapshot.params?.id;

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

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
