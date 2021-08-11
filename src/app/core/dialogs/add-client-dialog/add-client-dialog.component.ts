import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import {
  PolymorpheusComponent,
  POLYMORPHEUS_CONTEXT,
} from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ClientCompanyType, ProductsOnRus } from '../../enums';
import { TaxSystemsEng, TaxSystemsRus } from '../../enums/tax-systems.enum';
import {
  ClientsCompanyService,
  DadataService,
  LoaderService,
} from '../../services';
import { ResultDialogComponent } from '../result-dialog';

@Component({
  selector: 'credex-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class AddClientDialogComponent implements OnInit {
  public companies$ = new BehaviorSubject<any>([]);

  public taxSystemsRus = TaxSystemsRus;

  public taxSystemsEng = TaxSystemsEng;

  public productsOnRus = ProductsOnRus;

  public clientCompanyType = ClientCompanyType;

  public selectedCompany: any;

  public formAddClient: FormGroup;

  public nameOfTaxSystem = '';

  public nameOfBankProduct = '';

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any>,
    private build: FormBuilder,
    private clientsCompanyService: ClientsCompanyService,
    private loaderService: LoaderService,
    public dadataService: DadataService,
    private dialogService: TuiDialogService,
    private destroy$: TuiDestroyService
  ) {
    this.formAddClient = this.build.group({
      innClient: null,
      taxSystem: [null, Validators.required],
      product: [null, Validators.required],
    });
  }

  public ngOnInit() {
    this.formAddClient.controls.innClient.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((inn: string) => {
        if (inn) {
          this.dadataService
            .getInnCompanies(inn, 10)
            .subscribe(({ suggestions: companies }: any) => {
              const filteredCompanies = companies.filter((company: any) => {
                return (
                  company?.data?.name?.short_with_opf.slice(0, 3) === 'ООО'
                );
              });
              this.companies$.next(filteredCompanies);
            });
          return;
        }
        this.selectedCompany = undefined;

        return this.companies$.next([]);
      });

    this.formAddClient.controls.taxSystem.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((taxSystem: number) => {
        this.nameOfTaxSystem = this.taxSystemsRus[taxSystem];
      });

    this.formAddClient.controls.product.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((product) => {
        this.nameOfBankProduct = this.productsOnRus[product];
      });
  }

  public selectCompany(company: any) {
    this.loaderService.show();
    this.dadataService
      .getTaxSystemCompany(company?.data?.inn)
      .subscribe(({ tax_system }) => {
        if (tax_system) {
          this.formAddClient.patchValue(
            {
              taxSystem: this.taxSystemsEng[tax_system],
            },
            { emitEvent: false }
          );

          this.formAddClient.controls['taxSystem'].disable();
        }
        this.selectedCompany = company?.data;

        this.loaderService.hide();
      });
  }

  public onCancel() {
    this.context.completeWith(false);
  }

  public clearSelectedCompany() {
    this.formAddClient.controls.innClient.setValue(null);
    this.selectedCompany = undefined;
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
    this.clientsCompanyService.addNewCompanyClient(body).subscribe(
      () => {
        const dataForDialog = {
          title: 'Операция проведена успешно',
          desc: 'Компания клиента была успешно добавлена',
        };
        this.onResult(dataForDialog)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.context.completeWith(true);
          });
      },
      (error) => {
        console.log(error);
        const dataForDialog = {
          title: 'Операция не была проведена',
          desc: 'Компания клиента не была добавлена. Попробуйте позже.',
        };
        this.onResult(dataForDialog).pipe(takeUntil(this.destroy$)).subscribe();
      }
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
