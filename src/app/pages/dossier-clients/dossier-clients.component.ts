import { Component, OnInit } from '@angular/core';
import {
  ClientCompany,
  ClientsCompanyService,
  LoaderService,
  ProductsOnRus,
} from 'src/app/core';

@Component({
  selector: 'credex-dossier-clients',
  templateUrl: './dossier-clients.component.html',
  styleUrls: ['./dossier-clients.component.scss'],
})
export class DossierClientsComponent implements OnInit {
  readonly columns: string[] = ['innClient', 'name', 'address', 'actions'];

  public loading = true;

  public productsOnRus = ProductsOnRus;

  public clientCompanies: ClientCompany[] = [];

  constructor(
    private loaderService: LoaderService,
    private clientsCompanyService: ClientsCompanyService
  ) {}

  public ngOnInit(): void {
    this.loaderService.show();
    this.clientsCompanyService.fetchClientsCompany().subscribe(
      (clientCompanies: ClientCompany[]) => {
        this.clientCompanies = clientCompanies;
        this.loaderService.hide();
      },
      () => {
        this.loaderService.hide();
      }
    );
  }
}
