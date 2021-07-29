import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import {
  PolymorpheusComponent,
  POLYMORPHEUS_CONTEXT,
} from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ClientCompanyType, ProductsOnRus, TaxSystems } from '../../enums';
import { ClientsCompanyService, DadataService } from '../../services';
import { ResultDialogComponent } from '../result-dialog';

@Component({
  selector: 'credex-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddClientDialogComponent implements OnInit, OnDestroy {
  public companies$ = new BehaviorSubject<any>([]);

  public taxSystems = TaxSystems;

  public productsOnRus = ProductsOnRus;

  public clientCompanyType = ClientCompanyType;

  public selectedCompany: any;

  public formAddClient: FormGroup;

  public nameOfTaxSystem = '';

  public nameOfBankProduct = '';

  public subscription = new Subscription();

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any>,
    private build: FormBuilder,
    private clientsCompanyService: ClientsCompanyService,
    public dadataService: DadataService,
    private dialogService: TuiDialogService
  ) {
    this.formAddClient = this.build.group({
      innClient: [null, Validators.required],
      taxSystem: [null, Validators.required],
      product: [null, Validators.required],
    });
  }

  public ngOnInit() {
    this.subscription.add(
      this.formAddClient.controls.innClient.valueChanges
        .pipe(debounceTime(300))
        .subscribe((inn: string) => {
          if (inn && this.selectedCompany?.data?.inn !== inn) {
            this.dadataService
              .getInnCompaniesFromDadata(inn, 10)
              .subscribe(({ suggestions: companies }: any) => {
                const filteredCompanies = companies.filter((company: any) => {
                  return (
                    company?.data?.inn.includes(inn) &&
                    company?.data?.name?.short_with_opf.slice(0, 3) === 'ООО'
                  );
                });
                this.companies$.next(filteredCompanies);
              });
            return;
          } else if (!inn) {
            this.selectedCompany = undefined;
          }

          return this.companies$.next([]);
        })
    );

    this.subscription.add(
      this.formAddClient.controls.taxSystem.valueChanges.subscribe(
        (taxSystem: number) => {
          this.nameOfTaxSystem = this.taxSystems[taxSystem];
        }
      )
    );

    this.subscription.add(
      this.formAddClient.controls.product.valueChanges.subscribe((product) => {
        this.nameOfBankProduct = this.productsOnRus[product];
      })
    );
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public selectCompany(company: any) {
    this.selectedCompany = company?.data;
  }

  public onCancel() {
    this.context.completeWith(false);
  }

  public onAddNewClient() {
    const body = {
      address: this.selectedCompany?.address?.value,
      inn: this.selectedCompany?.inn,
      kpp: this.selectedCompany?.kpp,
      name: this.selectedCompany?.name?.short_with_opf,
      ogrn: this.selectedCompany?.ogrn,
      ogrn_date: this.selectedCompany?.ogrn_date,
      product: this.formAddClient.controls.product.value,
      tax_system: this.formAddClient.controls.taxSystem.value,
      type: this.clientCompanyType[this.selectedCompany?.type],
    };
    this.subscription.add(
      this.clientsCompanyService.addNewCompanyClient(body).subscribe(
        () => {
          const dataForDialog = {
            title: 'Операция проведена успешно',
            desc: 'Компания клиента была успешно добавлена',
          };
          this.subscription.add(
            this.onResult(dataForDialog).subscribe(() => {
              this.context.completeWith(true);
            })
          );
        },
        (error) => {
          console.log(error);
          const dataForDialog = {
            title: 'Операция не была проведена',
            desc: 'Компания клиента не была добавлена. Попробуйте позже.',
          };
          this.subscription.add(this.onResult(dataForDialog).subscribe());
        }
      )
    );
  }

  public onResult({ title, desc }: { title: string; desc: string }) {
    return this.dialogService.open(
      new PolymorpheusComponent(ResultDialogComponent, this.injector),
      {
        dismissible: true,
        closeable: false,
        data: {
          title,
          desc,
        },
      }
    );
  }
}
