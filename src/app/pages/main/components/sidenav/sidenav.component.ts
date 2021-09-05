import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'credex-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input()
  public isOpenedSidenav = false;

  @Output()
  public onCloseSidenav = new EventEmitter<boolean>();

  public closeSidenav(): void {
    this.isOpenedSidenav = false;
    this.onCloseSidenav.emit(false);
  }
}
