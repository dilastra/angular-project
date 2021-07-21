import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DossierService } from 'src/app/core';

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

  constructor(
    private route: ActivatedRoute,
    private dossierService: DossierService
  ) {}

  public ngOnInit(): void {
    this.companyClientId = this.route.parent?.parent?.snapshot.params?.id;

    this.dossierService
      .getDossierCompanyClient(this.companyClientId)
      .subscribe(({ file, command, lease_contract }) => {
        this.companyCharter = { ...file };
        this.appointmentSoleExecutiveBody = { ...command };
        this.leaseAgreementPremises = { ...lease_contract };
      });
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
