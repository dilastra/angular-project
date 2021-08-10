import { Injectable } from '@angular/core';
import { TuiBrightness } from '@taiga-ui/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme$: Subject<TuiBrightness | ''> = new BehaviorSubject<any>(
    localStorage.getItem('darkTheme') ?? ''
  );

  constructor() {}

  public onChangeCurrentTheme(theme: TuiBrightness | '') {
    localStorage.setItem('darkTheme', theme ?? '');
    this.theme$.next(theme);
  }
}
