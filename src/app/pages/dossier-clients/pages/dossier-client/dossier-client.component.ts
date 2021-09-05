import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientCompany, ClientsCompanyService } from 'src/app/core';

@Component({
  selector: 'credex-dossier-client',
  templateUrl: './dossier-client.component.html',
  styleUrls: ['./dossier-client.component.scss'],
})
export class DossierClientComponent implements OnInit, OnDestroy {
  public idCompanyClient: string = '';

  public companyName = '';

  public subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private clientsCompanyService: ClientsCompanyService
  ) {}

  public ngOnInit(): void {
    this.idCompanyClient = this.route.snapshot.params.id;
    this.subscriptions.add(
      this.clientsCompanyService
        .getClientCompany(this.idCompanyClient)
        .subscribe(({ name }: ClientCompany) => {
          this.companyName = name;
        })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
