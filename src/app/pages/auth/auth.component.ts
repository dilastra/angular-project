import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Subscription } from 'rxjs';
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
  ],
})
export class AuthComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;

  public darkTheme = localStorage.getItem('darkTheme');

  public banks: Bank[] = [];

  public subscriptions = new Subscription();

  public error: TuiValidationError<{}> | null = null;

  public showLoader = false;

  constructor(
    private authService: AuthService,
    private bankService: BankService,
    private builder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.builder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      bankId: [null, [Validators.required]],
    });
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.bankService.getBankList().subscribe((banks) => {
        this.banks = banks;
      })
    );

    this.subscriptions.add(
      this.loginForm.valueChanges.subscribe(() => {
        this.error = null;
      })
    );
  }

  public getNameBank(): string {
    const bankId = this.loginForm.controls.bankId.value;
    return this.banks.find((bank) => bank.id === bankId)?.name ?? 'Нет имени';
  }

  public login() {
    this.showLoader = true;
    const { login, password, bankId: bank_id } = this.loginForm.value;

    this.subscriptions.add(
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
      )
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
