import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiBrightness } from '@taiga-ui/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ThemeService, User, UserService } from '../../core';

@Component({
  selector: 'credex-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [TuiDestroyService],
})
export class MainComponent implements OnInit {
  public themeSwitcherControl: FormControl = new FormControl(false);

  public isOpenedSidenav = false;

  constructor(
    private userService: UserService,
    private themeService: ThemeService,
    private destroy$: TuiDestroyService
  ) {}

  public ngOnInit(): void {
    this.userService.fetchUser().subscribe((user: User) => {
      this.userService.setUser(user);
    });

    this.themeSwitcherControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((isDarkTheme: boolean) => {
        const currentTheme = isDarkTheme ? 'onDark' : '';
        return this.themeService.onChangeCurrentTheme(currentTheme);
      });

    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((currentTheme: TuiBrightness | '') => {
        this.themeSwitcherControl.setValue(currentTheme === 'onDark');
      });
  }

  public onOpenSidenavEvent(isOpenedSidenav: boolean): void {
    this.isOpenedSidenav = isOpenedSidenav;
  }

  public onCloseSidenavEvent(isClosedSidenav: boolean): void {
    this.isOpenedSidenav = isClosedSidenav;
  }
}
