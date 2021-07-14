import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ClientsCompanyService,
  LoaderService,
  ProductsOnRus,
} from 'src/app/core';

@Component({
  selector: 'credex-table-dossier-clients',
  templateUrl: './table-dossier-clients.component.html',
  styleUrls: ['./table-dossier-clients.component.scss'],
})
export class TableDossierClientsComponent implements OnInit, OnDestroy {
  readonly columns: string[] = ['innClient', 'name', 'address', 'actions'];

  public loading = true;

  public productsOnRus = ProductsOnRus;

  public subscription = new Subscription();

  public clientCompanies: any[] = [];

  constructor(
    private loaderService: LoaderService,
    private clientsCompanyService: ClientsCompanyService
  ) {}

  public ngOnInit(): void {
    this.subscription.add(this.getClientsCompany());
  }

  public getClientsCompany() {
    this.loaderService.show();
    return this.clientsCompanyService
      .fetchClientsCompany()
      .subscribe((clientCompanies: any[]) => {
        this.clientCompanies = clientCompanies;
        this.loaderService.hide();
      });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
