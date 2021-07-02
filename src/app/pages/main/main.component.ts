import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User, UserService } from '../../core';

@Component({
  selector: 'credex-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public themeSwitcherControl: FormControl;

  public subscriptions = new Subscription();

  public isOpenedSidenav = false;

  constructor(private userService: UserService) {
    this.themeSwitcherControl = new FormControl(false);
  }

  public ngOnInit(): void {
    // this.subscriptions.add(
    //   this.userService.fetchUser().subscribe((user: User) => {
    //     this.userService.setUser(user);
    //     console.log(this.userService.getUser());
    //   })
    // );
    setTimeout(() => {
      if (localStorage.getItem('isDarkTheme')) {
        this.themeSwitcherControl.setValue(
          JSON.parse(localStorage.getItem('isDarkTheme')!)
        );
      }
    }, 0);
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
