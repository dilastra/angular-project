import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Subscription } from 'rxjs';
import {
  AddClientDialogComponent,
  ClientsCompanyService,
  LoaderService,
  ProductsOnRus,
  ResultDialogComponent,
} from 'src/app/core';

@Component({
  selector: 'credex-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Поле обязательно к заполнению',
      },
    },
  ],
})
export class ClientsComponent implements OnInit, OnDestroy {
  readonly columns: string[] = [
    'innClient',
    'name',
    'address',
    'product',
    'bank',
  ];

  public loading = true;

  public productsOnRus = ProductsOnRus;

  public subscription = new Subscription();

  public clientCompanies: any[] = [];

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
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
        .subscribe((result) => {
          if (result) {
            this.subscription.add(this.getClientsCompany());
          }
        })
    );
  }
}
