import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { BeneficiaryService, FilesService, LoaderService } from 'src/app/core';

@Component({
  selector: 'credex-place-residence',
  templateUrl: './place-residence.component.html',
  styleUrls: ['./place-residence.component.scss'],
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

  public zipCodeMask = {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    guide: true,
  };

  constructor(
    private loader: LoaderService,
    private beneficiaryService: BeneficiaryService,
    private filesService: FilesService
  ) {}

  public ngOnInit(): void {
    this.subscriptions.add(
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
                    ...this.placeResidenceForm.value,
                  };

                  this.subscriptions.add(
                    this.beneficiaryService
                      .updatePlaceResidence(
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
              city: null,
              street: null,
              house: null,
              flat: null,
              zip_code: null,
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
        })
    );
  }

  public getControl(nameControl: string) {
    return this.placeResidenceForm.get(nameControl) as FormControl;
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
}
