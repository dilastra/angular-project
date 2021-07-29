import { formatPercent } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BeneficiaryService, LoaderService } from 'src/app/core';

@Component({
  selector: 'credex-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.scss'],
})
export class BeneficiaryComponent implements OnInit {
  @Input()
  public beneficiaryFormGroup!: FormGroup;

  @Input()
  public companyClientId!: string;

  @Output()
  public remove = new EventEmitter();

  public fullName: string = '';

  public share: string = '';

  public beneficiaryId = '';

  constructor(
    private loader: LoaderService,
    private beneficiaryService: BeneficiaryService
  ) {}

  public ngOnInit(): void {
    const { first_name, last_name, middle_name } =
      this.beneficiaryFormGroup.get('passport')?.value;

    const { share } = this.beneficiaryFormGroup.value;

    this.fullName = `${last_name ?? ''} ${first_name ?? ''} ${
      middle_name ?? ''
    }`;
    this.share = share ? ` | Доля: ${share} %` : '';

    this.beneficiaryId = this.getFormControl('id').value as string;

    this.beneficiaryFormGroup.valueChanges.subscribe(({ passport, share }) => {
      const { first_name = '', last_name = '', middle_name = '' } = passport;

      this.fullName = `${last_name ?? ''} ${first_name ?? ''} ${
        middle_name ?? ''
      }`;
      this.share = share ? ` | Доля: ${share} %` : '';
    });
  }

  public getFormControl(nameControl: string): FormGroup {
    return this.beneficiaryFormGroup.get(nameControl) as FormGroup;
  }

  public onRemove() {
    this.remove.emit();
  }

  public onSaveShare() {
    this.loader.show();
    const { share } = this.beneficiaryFormGroup.value;
    this.beneficiaryService
      .updateShare(this.companyClientId, this.beneficiaryId, share)
      .subscribe(
        () => {
          this.loader.hide();
        },
        () => {
          this.loader.hide();
        }
      );
  }
}
