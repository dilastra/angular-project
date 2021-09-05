import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { BeneficiaryService, FilesService, LoaderService } from 'src/app/core';

@Component({
  selector: 'credex-snils',
  templateUrl: './snils.component.html',
  styleUrls: ['./snils.component.scss'],
})
export class SnilsComponent implements OnInit {
  @Input()
  public snilsForm!: FormGroup;

  @Input()
  public beneficiaryId!: string;

  @Input()
  public companyClientId!: string;

  public loadingFiles: any[] = [];

  public isDownloadFile = false;

  public subscriptions: Subscription = new Subscription();

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
                    ...this.snilsForm.value,
                  };

                  this.subscriptions.add(
                    this.beneficiaryService
                      .updateSnils(
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
        })
    );
  }

  public downloadFile(formControl: FormControl) {
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

  public getControl(nameControl: string): FormControl {
    return this.snilsForm.get(nameControl) as FormControl;
  }

  public onSave() {
    this.loader.show();
    const { file, ...otherValue } = this.snilsForm.value;
    const model = {
      file_id: file.id,
      ...otherValue,
    };

    this.subscriptions.add(
      this.beneficiaryService
        .updateSnils(this.companyClientId, this.beneficiaryId, model)
        .subscribe(
          () => {
            this.snilsForm.markAsUntouched();
            this.loader.hide();
          },
          () => {
            this.loader.hide();
          }
        )
    );
  }
}
