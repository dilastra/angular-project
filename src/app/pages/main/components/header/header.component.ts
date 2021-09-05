import {
  Component,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {
  AuthService,
  ConfirmDialogComponent,
  ThemeService,
} from 'src/app/core';

@Component({
  selector: 'credex-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  public themeSwitcherControl!: FormControl;

  @Input()
  public isOpenedSidenav = false;

  @Output()
  public openSidenavEvent = new EventEmitter<boolean>();

  public darkTheme = '';

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  public ngOnInit(): void {
    this.themeService.theme$.subscribe((currentTheme) => {
      setTimeout(() => {
        this.darkTheme = currentTheme;
      }, 0);
    });
  }

  public openSidenav(): void {
    this.isOpenedSidenav = !this.isOpenedSidenav;
    this.openSidenavEvent.emit(this.isOpenedSidenav);
  }

  public onLogout(): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(ConfirmDialogComponent, this.injector),
        {
          closeable: false,
          data: {
            title: 'Выход',
            desc: 'Вы точно хотите выйти?',
            titleSubmitButton: 'Выйти',
          },
        }
      )
      .subscribe((isLogout: boolean) => {
        if (isLogout) {
          this.authService.logout();
          this.router.navigate(['/auth']);
        }
      });
  }
}
