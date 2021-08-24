import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Subscription, zip } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import {
  AddClientDialogComponent,
  BankService,
  ClientsCompanyService,
  LoaderService,
  ProductsOnRus,
} from 'src/app/core';

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

  public subscription = new Subscription();

  public clientCompanies: any[] = [];

  public banks: any[] = [];

  public search: FormControl = new FormControl();

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
      ([clientCompanies, banks]: any[]) => {
        this.banks = banks;
        this.banks.forEach(({ id }) => {
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

  public onAddClient() {
    this.subscription.add(
      this.dialogService
        .open(
          new PolymorpheusComponent(AddClientDialogComponent, this.injector),
          {
            dismissible: true,
            closeable: false,
          }
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
          if (result) {
            this.getClientsCompany();
          }
        })
    );
  }

  public getAttachedStatus(bankId: string, client: any) {
    return client.client_company_banks.find(
      ({ bank_id }: { bank_id: string }) => bank_id === bankId
    )?.is_client_attached
      ? 'Занят'
      : 'Свободен';
  }

  public getTuiCellName(bankId: string) {
    return `bank_${bankId}`;
  }
}
