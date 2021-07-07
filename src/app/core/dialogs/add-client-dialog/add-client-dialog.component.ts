import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProductsOnRus, TaxSystems } from '../../enums';
import { ClientsCompanyService, DadataService } from '../../services';

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

  public selectedCompany: any;

  public formAddClient: FormGroup;

  public nameOfTaxSystem = '';

  public nameOfBankProduct = '';

  public subscription = new Subscription();

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any>,
    private build: FormBuilder,
    private clientsCompanyService: ClientsCompanyService,
    public dadataService: DadataService
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
        .pipe(debounceTime(500))
        .subscribe((inn: string) => {
          if (inn && this.selectedCompany?.data?.inn !== inn) {
            this.dadataService
              .getInnCompaniesFromDadata(inn, 10)
              .subscribe(({ suggestions: companies }: any) => {
                const filteredCompanies = companies.filter((company: any) =>
                  company?.data?.inn.includes(inn)
                );
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
    this.selectedCompany = company;
  }

  public onCancel() {
    this.context.completeWith(false);
  }

  public onAddNewClient() {
    const body = {
      product: this.formAddClient.controls.product.value,
      tax_system: this.formAddClient.controls.taxSystem.value,
      ...this.selectedCompany.data,
    };
    this.subscription.add(
      this.clientsCompanyService.addNewCompanyClient(body).subscribe(() => {
        this.context.completeWith(true);
      })
    );
  }
}
