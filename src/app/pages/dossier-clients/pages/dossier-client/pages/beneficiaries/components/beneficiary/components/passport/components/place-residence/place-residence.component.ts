import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BeneficiaryService, DadataService, LoaderService } from 'src/app/core';

@Component({
  selector: 'credex-place-residence',
  templateUrl: './place-residence.component.html',
  styleUrls: ['./place-residence.component.scss'],
  providers: [TuiDestroyService],
})
export class PlaceResidenceComponent implements OnInit {
  @Input()
  public placeResidenceForm!: FormGroup;

  @Input()
  public beneficiaryId!: string;

  @Input()
  public companyClientId!: string;

  public loadingFiles: any[] = [];

  public isDownloadFile = false;

  public subscriptions: Subscription = new Subscription();

  public searchAddresses$ = new BehaviorSubject<any[]>([]);

  public fiasCodes: any = {};

  public zipCodeMask = {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    guide: true,
  };

  constructor(
    private loader: LoaderService,
    private beneficiaryService: BeneficiaryService,
    private dadataService: DadataService,
    private destroy$: TuiDestroyService
  ) {}

  public ngOnInit(): void {
    this.getControl('city')
      .valueChanges.pipe(
        takeUntil(this.destroy$),
        debounceTime(50),
        distinctUntilChanged()
      )
      .subscribe((city) => {
        if (city) {
          const model = {
            query: city,
            from_bound: { value: 'city' },
            to_bound: { value: 'settlement' },
            locations: [{ country: 'Россия' }],
            count: 10,
            restrict_value: true,
          };
          this.dadataService
            .getAddresses(model)
            .subscribe(({ suggestions }: { suggestions: any[] }) => {
              this.searchAddresses$.next(suggestions);
            });
        } else {
          this.placeResidenceForm.patchValue({
            street: null,
            flat: null,
            house: null,
            zip_code: null,
          });
        }
      });
    this.getControl('street')
      .valueChanges.pipe(
        takeUntil(this.destroy$),
        debounceTime(50),
        distinctUntilChanged()
      )
      .subscribe((street) => {
        if (street) {
          const model: any = {
            query: street,
            from_bound: { value: 'street' },
            to_bound: { value: 'street' },
            locations: [{ country: 'Россия' }],
            count: 10,
            restrict_value: true,
          };

          if (this.fiasCodes.settlement_fias_id) {
            model.locations[0].settlement_fias_id =
              this.fiasCodes.settlement_fias_id;
          } else if (this.fiasCodes.city_fias_id) {
            model.locations[0].city_fias_id = this.fiasCodes.city_fias_id;
          }
          this.dadataService
            .getAddresses(model)
            .subscribe(({ suggestions }: { suggestions: any[] }) => {
              this.searchAddresses$.next(suggestions);
            });
        } else {
          this.placeResidenceForm.patchValue({
            flat: null,
            house: null,
            zip_code: null,
          });
        }
      });
    this.getControl('house')
      .valueChanges.pipe(
        takeUntil(this.destroy$),
        debounceTime(50),
        distinctUntilChanged()
      )
      .subscribe((house) => {
        if (house) {
          const model: any = {
            query: house,
            from_bound: { value: 'house' },
            to_bound: { value: 'house' },
            locations: [
              {
                country: 'Россия',
                street_fias_id: this.fiasCodes.street_fias_id,
              },
            ],
            count: 10,
            restrict_value: true,
          };
          this.dadataService
            .getAddresses(model)
            .subscribe(({ suggestions }: { suggestions: any[] }) => {
              this.searchAddresses$.next(suggestions);
            });
        }

        this.placeResidenceForm.patchValue({
          flat: null,
        });
      });
  }

  public getControl(nameControl: string) {
    return this.placeResidenceForm.get(nameControl) as FormControl;
  }

  public onSave() {
    this.loader.show();
    const model = this.placeResidenceForm.value;
    this.subscriptions.add(
      this.beneficiaryService
        .updatePlaceResidence(this.companyClientId, this.beneficiaryId, model)
        .subscribe(() => {
          this.placeResidenceForm.markAsUntouched();
          this.loader.hide();
        })
    );
  }

  public findInDadata(model: any) {
    return this.dadataService.getAddresses(model);
  }

  public setFiasCode(fiasCode: any) {
    this.fiasCodes = { ...this.fiasCodes, ...fiasCode };
  }

  public setZipCode(zipCode: string) {
    this.placeResidenceForm.patchValue(
      {
        zip_code: zipCode,
      },
      { emitEvent: false }
    );
  }

  public setFiasCodeForSettlement({ data }: any) {
    return data?.settlement
      ? { settlement_fias_id: data?.fias_id, city_fias_id: null }
      : { city_fias_id: data?.fias_id, settlement_fias_id: null };
  }
}
