import { Component } from '@angular/core';

@Component({
  selector: 'credex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isDarkTheme = JSON.parse(localStorage.getItem('isDarkTheme')) ?? false;

  public componentAdded(elementRef) {
    elementRef?.themeSwitcherControl?.valueChanges?.subscribe(
      (value: boolean) => {
        this.isDarkTheme = value;
      }
    );
  }
}
