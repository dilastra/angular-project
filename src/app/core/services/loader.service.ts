import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isShowLoader = new BehaviorSubject(true);

  public show() {
    return this.isShowLoader.next(true);
  }

  public hide() {
    return this.isShowLoader.next(false);
  }
}
