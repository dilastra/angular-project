import { Component, ElementRef } from '@angular/core';
import { TuiBrightness } from '@taiga-ui/core';
import { ThemeService } from './core';

@Component({
  selector: 'credex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public theme: TuiBrightness | null = null;

  constructor(private themeService: ThemeService) {
    this.themeService.theme$.subscribe((currentTheme) => {
      this.theme = currentTheme;
    });
  }
}
