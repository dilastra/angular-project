import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  constructor() {}

  public openSidenav() {
    this.isOpenedSidenav = !this.isOpenedSidenav;
    this.openSidenavEvent.emit(this.isOpenedSidenav);
  }
}
