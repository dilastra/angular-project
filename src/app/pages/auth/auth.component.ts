import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiDestroyService, TuiValidationError } from '@taiga-ui/cdk';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { takeUntil } from 'rxjs/operators';
import { AuthToken, Bank, BankService } from '../../core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'credex-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Поле обязательно к заполнению',
      },
    },
    TuiDestroyService,
  ],
})
export class AuthComponent implements OnInit {
  public loginForm: FormGroup;

  public darkTheme = localStorage.getItem('darkTheme');

  public banks: Bank[] = [];

  public error: TuiValidationError<{}> | null = null;

  public showLoader = false;

  constructor(
    private authService: AuthService,
    private bankService: BankService,
    private builder: FormBuilder,
    private router: Router,
    private destroy$: TuiDestroyService
  ) {
    this.loginForm = this.builder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      bankId: [null, [Validators.required]],
    });
  }

  public ngOnInit(): void {
    this.bankService.getBankList().subscribe((banks) => {
      this.banks = banks;
    });

    this.loginForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.error = null;
    });
  }

  public getNameBank(): string {
    const bankId: string = this.loginForm.controls.bankId.value;
    return this.banks.find((bank) => bank.id === bankId)?.name ?? 'Нет имени';
  }

  public login(): void {
    this.showLoader = true;
    const { login, password, bankId: bank_id } = this.loginForm.value;
    this.authService.fetchLogin({ login, password, bank_id }).subscribe(
      (token: AuthToken) => {
        this.authService.setTokenToLocalStorage(token);
        this.router.navigate(['/']);
        this.showLoader = false;
      },
      ({ error }) => {
        this.showLoader = false;
        this.error = new TuiValidationError(
          error?.message ?? 'Неизвестная ошибка. Попробуйте позже'
        );
      }
    );
  }
}
