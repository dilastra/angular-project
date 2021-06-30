import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) {
    this.themeSwitcherControl = new FormControl(false);
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.userService.fetchUser().subscribe((user: User) => {
        this.userService.setUser(user);
        console.log(this.userService.getUser());
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
