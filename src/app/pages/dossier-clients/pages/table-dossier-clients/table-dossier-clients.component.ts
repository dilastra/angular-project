import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { debounceTime, takeUntil } from 'rxjs/operators';
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
export class TableDossierClientsComponent implements OnInit {
  readonly columns: string[] = ['innClient', 'name', 'address', 'actions'];

  public loading = true;

  public productsOnRus = ProductsOnRus;

  public clientCompanies: any[] = [];

  public search: FormControl = new FormControl();

  public isSearch = false;

  constructor(
    private loaderService: LoaderService,
    private clientsCompanyService: ClientsCompanyService,
    private destroy$: TuiDestroyService
  ) {}

  public ngOnInit(): void {
    this.loaderService.show();
    this.getClientsCompany().subscribe((clientCompanies: any[]) => {
      this.clientCompanies = clientCompanies;
      this.loaderService.hide();
    });

    this.search.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((searchCompany) => {
        this.clientCompanies = [];
        this.isSearch = true;
        this.getClientsCompany(searchCompany).subscribe(
          (clientCompanies: any[]) => {
            this.clientCompanies = clientCompanies;
            this.isSearch = false;
          }
        );
      });
  }

  public getClientsCompany(search = '') {
    return this.clientsCompanyService.fetchClientsCompany(search);
  }
}
