import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TuiDay } from '@taiga-ui/cdk';
import { Subscription } from 'rxjs';
import { BeneficiaryService, LoaderService } from 'src/app/core';

@Component({
  selector: 'credex-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.scss'],
})
export class BeneficiariesComponent implements OnInit, OnDestroy {
  public companyClientId: string = '';

  public beneficiaresFormArray: FormArray;

  public beneficiaresForm: FormGroup;

  public subscriptions: Subscription = new Subscription();

  constructor(
    private beneficiaryService: BeneficiaryService,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private builder: FormBuilder
  ) {
    this.beneficiaresFormArray = this.builder.array([]);
    this.beneficiaresForm = this.builder.group({
      beneficiaresFormArray: this.beneficiaresFormArray,
    });
  }

  public getControlsBeneficiaresFormArray() {
    return this.beneficiaresFormArray.controls as FormGroup[];
  }

  public ngOnInit(): void {
    this.loader.show();
    this.companyClientId = this.route.snapshot.params.id;
    this.subscriptions.add(
      this.beneficiaryService
        .getBeneficiariesClientCompany(this.companyClientId)
        .subscribe((beneficiares: any) => {
          beneficiares.forEach((beneficiary: any) => {
            this.beneficiaresFormArray.push(
              this.createBeneficiaryForm(beneficiary) as FormGroup,
              { emitEvent: false }
            );
          });
          this.loader.hide();
        })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public createBeneficiaryForm(beneficiary: any = {}) {
    const {
      id = null,
      passport = null,
      place_residence = null,
      share = null,
      snils = null,
    } = beneficiary;
    return this.builder.group({
      id,
      passport: this.builder.group({
        date_from: [
          this.getTuiDate(passport?.date_from),
          [Validators.required],
        ],
        file: [passport?.file, [Validators.required]],
        first_name: [passport?.first_name, [Validators.required]],
        id: passport?.id,
        issuer: [passport?.issuer, [Validators.required]],
        issuer_code: [passport?.issuer_code, [Validators.required]],
        last_name: [passport?.last_name, [Validators.required]],
        middle_name: [passport?.middle_name, [Validators.required]],
        number: [passport?.number, [Validators.required]],
        series: [passport?.series, [Validators.required]],
        date_born: [
          this.getTuiDate(passport?.date_born),
          [Validators.required],
        ],
      }),
      place_residence: this.builder.group({
        city: [place_residence?.city, [Validators.required]],
        flat: [place_residence?.flat, [Validators.required]],
        house: [place_residence?.house, [Validators.required]],
        id: place_residence?.id,
        street: [place_residence?.street, [Validators.required]],
        zip_code: [place_residence?.zip_code, [Validators.required]],
      }),
      snils: this.builder.group({
        date: [this.getTuiDate(snils?.date), [Validators.required]],
        file: [snils?.file, [Validators.required]],
        id: snils?.id,
        number: [snils?.number, [Validators.required]],
      }),
      share: [share, [Validators.required]],
    });
  }

  public addNewBeneficiary() {
    this.loader.show();
    this.subscriptions.add(
      this.beneficiaryService
        .addNewBeneficiar(this.companyClientId)
        .subscribe((beneficiary) => {
          this.beneficiaresFormArray.push(
            this.createBeneficiaryForm(beneficiary) as FormGroup,
            { emitEvent: false }
          );
          this.loader.hide();
        })
    );
  }

  public getTuiDate(date: string) {
    if (!date) {
      return null;
    }

    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    return new TuiDay(year, month, day);
  }

  public onRemovebeneficiary(i: number) {
    this.loader.show();
    const { id } = this.beneficiaresFormArray.at(i).value;
    this.subscriptions.add(
      this.beneficiaryService
        .removeBeneficiar(this.companyClientId, id)
        .subscribe(
          () => {
            this.beneficiaresFormArray.removeAt(i);
            this.loader.hide();
          },
          () => {
            this.loader.hide();
          }
        )
    );
  }
}
