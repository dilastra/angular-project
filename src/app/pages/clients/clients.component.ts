import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, zip } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import {
  AddClientDialogComponent,
  Bank,
  BankService,
  ClientsCompanyService,
  LoaderService,
  ProductsOnRus,
} from 'src/app/core';
import { ClientCompany } from 'src/app/core/interfaces/client-company.interface';

@Component({
  selector: 'credex-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [
    TuiDestroyService,
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Поле обязательно к заполнению',
      },
    },
  ],
})
export class ClientsComponent implements OnInit {
  public columns: string[] = ['innClient', 'name', 'address', 'product'];

  public loading = true;

  public productsOnRus = ProductsOnRus;

  public clientCompanies: ClientCompany[] = [];

  public banks: Bank[] = [];

  public search: FormControl = new FormControl('');

  public isSearch = false;

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private loaderService: LoaderService,
    private clientsCompanyService: ClientsCompanyService,
    private destroy$: TuiDestroyService,
    private bankService: BankService
  ) {}

  public ngOnInit() {
    this.loaderService.show();
    zip(this.getClientsCompany(), this.bankService.getBankList()).subscribe(
      ([clientCompanies, banks]: [ClientCompany[], Bank[]]) => {
        this.banks = banks;
        this.banks.forEach(({ id }: Bank): void => {
          this.columns.push(`bank_${id}`);
        });
        this.clientCompanies = clientCompanies;
        this.loaderService.hide();
      },
      () => {
        this.loaderService.hide();
      }
    );

    this.search.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((searchCompany: string) => {
        this.clientCompanies = [];
        this.isSearch = true;
        this.getClientsCompany(searchCompany).subscribe(
          (clientCompanies: ClientCompany[]) => {
            this.clientCompanies = clientCompanies;
            this.isSearch = false;
          }
        );
      });
  }

  public getClientsCompany(search = ''): Observable<ClientCompany[]> {
    return this.clientsCompanyService.fetchClientsCompany(search);
  }

  public onAddClient(): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(AddClientDialogComponent, this.injector),
        {
          dismissible: true,
          closeable: false,
        }
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: boolean) => {
        if (result) {
          this.getClientsCompany();
        }
      });
  }

  public getAttachedStatus(bankId: string, client: ClientCompany): string {
    return client.client_company_banks.find(
      ({ bank_id }: { bank_id: string }) => bank_id === bankId
    )?.is_client_attached
      ? 'Занят'
      : 'Свободен';
  }

  public getCellName(bankId: string): string {
    return `bank_${bankId}`;
  }
}
