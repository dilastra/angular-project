import {
  Component,
  EventEmitter,
  Inject,
  Injector,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AuthService, ConfirmDialogComponent } from 'src/app/core';

@Component({
  selector: 'credex-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  public themeSwitcherControl!: FormControl;

  @Input()
  public isOpenedSidenav = false;

  @Output()
  public openSidenavEvent = new EventEmitter<boolean>();

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private router: Router,
    private authService: AuthService
  ) {}

  public openSidenav() {
    this.isOpenedSidenav = !this.isOpenedSidenav;
    this.openSidenavEvent.emit(this.isOpenedSidenav);
  }

  public onLogout() {
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