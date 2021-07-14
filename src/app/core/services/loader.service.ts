import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isShowLoader = new BehaviorSubject(true);

  public show() {
    setTimeout(() => {
      return this.isShowLoader.next(true);
    }, 0);
  }

  public hide() {
    setTimeout(() => {
      return this.isShowLoader.next(false);
    }, 0);
  }
}
