import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { BeneficiaryService, FilesService, LoaderService } from 'src/app/core';

@Component({
  selector: 'credex-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss'],
})
export class PassportComponent implements OnInit {
  @Input()
  public passportForm!: FormGroup;

  @Input()
  public placeResidenceForm!: FormGroup;

  @Input()
  public beneficiaryId!: string;

  @Input()
  public companyClientId!: string;

  public loadingFiles: any[] = [];

  public subscriptions: Subscription = new Subscription();

  public isDownloadFile = false;

  constructor(
    private filesService: FilesService,
    private loader: LoaderService,
    private beneficiaryService: BeneficiaryService
  ) {}

  public ngOnInit(): void {
    this.getControl('file')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((file: any) => {
        if (file && !file?.id) {
          this.loader.show();
          this.loadingFiles = [file];
          this.subscriptions.add(
            this.filesService
              .uploadFile(file)
              .subscribe(({ id, name, size, type }: any) => {
                this.getControl('file').patchValue(
                  {
                    id,
                    name,
                    size,
                    type,
                  },
                  { emitEvent: false }
                );
                const model: any = {
                  file_id: id,
                  ...this.passportForm.value,
                };

                this.subscriptions.add(
                  this.beneficiaryService
                    .updatePassport(
                      this.companyClientId,
                      this.beneficiaryId,
                      model
                    )
                    .subscribe(
                      () => {
                        this.loadingFiles = [];
                        this.loader.hide();
                      },
                      () => {
                        this.loader.hide();
                      }
                    )
                );
              })
          );
        } else if (!file) {
          this.loader.show();
          const model: any = {
            file_id: null,
            first_name: null,
            last_name: null,
            middle_name: null,
            series: null,
            number: null,
            date_from: null,
            issuer: null,
            issuer_code: null,
          };
          this.subscriptions.add(
            this.beneficiaryService
              .updatePassport(this.companyClientId, this.beneficiaryId, model)
              .subscribe(
                () => {
                  this.loader.hide();
                },
                () => {
                  this.loader.hide();
                }
              )
          );
        }
      });
  }

  public getControl(nameControl: string): AbstractControl {
    return this.passportForm.get(nameControl) as AbstractControl;
  }

  public downloadFile(formControl: AbstractControl) {
    this.isDownloadFile = true;
    this.filesService.downloadFile(formControl).subscribe(
      ({ isDownloaded }) => {
        if (isDownloaded) this.isDownloadFile = false;
      },
      () => {
        this.isDownloadFile = false;
      }
    );
  }
}
