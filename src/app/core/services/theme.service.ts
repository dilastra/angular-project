import { Injectable } from '@angular/core';
import { TuiBrightness } from '@taiga-ui/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme$: Subject<TuiBrightness | null> = new BehaviorSubject<any>(
    localStorage.getItem('theme') ?? null
  );

  constructor() {}

  public onChangeCurrentTheme(theme: TuiBrightness | null) {
    if (theme) {
      localStorage.setItem('theme', theme);
    }
    this.theme$.next(theme);
  }
}
