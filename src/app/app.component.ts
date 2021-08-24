import { Component } from '@angular/core';
import { TuiBrightness } from '@taiga-ui/core';
import { LoaderService, ThemeService } from './core';

@Component({
  selector: 'credex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isShowLoader = false;

  public theme: TuiBrightness | any = '';

  constructor(
    private themeService: ThemeService,
    private loaderService: LoaderService
  ) {
    this.themeService.theme$.subscribe((currentTheme) => {
      setTimeout(() => {
        this.theme = currentTheme;
      }, 0);
    });
    this.loaderService.isShowLoader.subscribe((isShowLoader: boolean) => {
      this.isShowLoader = isShowLoader;
    });
  }
}
