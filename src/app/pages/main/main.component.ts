import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ThemeService, User, UserService } from '../../core';

@Component({
  selector: 'credex-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [TuiDestroyService],
})
export class MainComponent implements OnInit {
  public themeSwitcherControl: FormControl;

  public isOpenedSidenav = false;

  constructor(
    private userService: UserService,
    private themeService: ThemeService,
    private destroy$: TuiDestroyService
  ) {
    this.themeSwitcherControl = new FormControl(false);
  }

  public ngOnInit(): void {
    this.userService.fetchUser().subscribe((user: User) => {
      this.userService.setUser(user);
    });

    this.themeSwitcherControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((isDarkTheme) => {
        const currentTheme = isDarkTheme ? 'onDark' : '';
        return this.themeService.onChangeCurrentTheme(currentTheme);
      });

    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((currentTheme) => {
        this.themeSwitcherControl.setValue(currentTheme === 'onDark');
      });
  }

  public onOpenSidenavEvent(isOpenedSidenav: boolean) {
    this.isOpenedSidenav = isOpenedSidenav;
  }

  public onCloseSidenavEvent(isClosedSidenav: boolean) {
    this.isOpenedSidenav = isClosedSidenav;
  }
}
