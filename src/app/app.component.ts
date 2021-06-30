import { Component, ElementRef } from '@angular/core';
import { TuiBrightness } from '@taiga-ui/core';

@Component({
  selector: 'credex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isDarkTheme = false;

  public theme: TuiBrightness | null = 'onLight';

  constructor() {
    if (localStorage.getItem('isDarkTheme')) {
      this.isDarkTheme = JSON.parse(localStorage.getItem('isDarkTheme')!);
      this.theme = JSON.parse(localStorage.getItem('isDarkTheme')!) && 'onDark';
    }
  }

  public componentAdded(elementRef: any) {
    elementRef?.themeSwitcherControl?.valueChanges?.subscribe(
      (isDarkTheme: boolean) => {
        this.theme = isDarkTheme ? 'onDark' : 'onLight';
        localStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme));
      }
    );
  }
}
