import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { LoaderService, ThemeService, User, UserService } from '../../core';

@Component({
  selector: 'credex-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public themeSwitcherControl: FormControl;

  public subscriptions = new Subscription();

  public isShowLoader = false;

  public isOpenedSidenav = false;

  constructor(
    private loaderService: LoaderService,
    private userService: UserService,
    private themeService: ThemeService
  ) {
    this.themeSwitcherControl = new FormControl(false);

    this.subscriptions.add(
      this.loaderService.isShowLoader.subscribe((isShowLoader) => {
        this.isShowLoader = isShowLoader;
      })
    );
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.userService.fetchUser().subscribe((user: User) => {
        this.userService.setUser(user);
      })
    );

    this.subscriptions.add(
      this.themeSwitcherControl.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe((isDarkTheme) => {
          const currentTheme = isDarkTheme ? 'onDark' : null;
          return this.themeService.onChangeCurrentTheme(currentTheme);
        })
    );

    this.subscriptions.add(
      this.themeService.theme$.subscribe((currentTheme) => {
        this.themeSwitcherControl.setValue(currentTheme === 'onDark');
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public onOpenSidenavEvent(isOpenedSidenav: boolean) {
    this.isOpenedSidenav = isOpenedSidenav;
  }

  public onCloseSidenavEvent(isClosedSidenav: boolean) {
    this.isOpenedSidenav = isClosedSidenav;
  }
}
