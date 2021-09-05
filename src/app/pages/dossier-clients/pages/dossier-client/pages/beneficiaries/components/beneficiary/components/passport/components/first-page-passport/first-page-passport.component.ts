import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BeneficiaryService, LoaderService } from 'src/app/core';

@Component({
  selector: 'credex-first-page-passport',
  templateUrl: './first-page-passport.component.html',
  styleUrls: ['./first-page-passport.component.scss'],
})
export class FirstPagePassportComponent implements OnInit {
  @Input()
  public passportForm!: FormGroup;

  @Input()
  public beneficiaryId!: string;

  @Input()
  public companyClientId!: string;

  public seriesMask = { mask: [/\d/, /\d/, '-', /\d/, /\d/], guide: true };

  public numberMask = {
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    guide: true,
  };

  public issuerIdMask = {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    guide: true,
  };

  constructor(
    private loader: LoaderService,
    private beneficiaryService: BeneficiaryService
  ) {}

  ngOnInit(): void {}

  public onSave() {
    this.loader.show();
    const { file, date_from, date_born, ...otherValue } =
      this.passportForm.value;

    const model = {
      file_id: file.id,
      date_from: typeof date_from === 'string' ? date_from : date_from.toJSON(),
      date_born: typeof date_born === 'string' ? date_born : date_born.toJSON(),
      ...otherValue,
    };
    this.beneficiaryService
      .updatePassport(this.companyClientId, this.beneficiaryId, model)
      .subscribe(() => {
        this.passportForm.markAsUntouched();
        this.loader.hide();
      });
  }
}
