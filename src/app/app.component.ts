import { Component, ElementRef } from '@angular/core';
import { TuiBrightness } from '@taiga-ui/core';

@Component({
  selector: 'credex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public theme: TuiBrightness | null = null;
  public loading = true;

  constructor() {
    if (localStorage.getItem('isDarkTheme')) {
      this.theme = JSON.parse(localStorage.getItem('isDarkTheme')!)
        ? 'onDark'
        : null;
    }
  }

  public componentAdded(elementRef: any) {
    elementRef?.themeSwitcherControl?.valueChanges?.subscribe(
      (isDarkTheme: boolean) => {
        this.theme = isDarkTheme ? 'onDark' : null;
        localStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme));
      }
    );
  }
}
