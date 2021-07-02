import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'credex-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input()
  public isOpenedSidenav = false;

  @Output()
  public onCloseSidenav = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public closeSidenav() {
    this.isOpenedSidenav = false;
    this.onCloseSidenav.emit(false);
  }
}
