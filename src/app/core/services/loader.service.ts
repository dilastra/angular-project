import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isShowLoader = new BehaviorSubject(false);

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
