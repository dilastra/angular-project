import { Component, Inject } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'credex-dialog-result',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss'],
})
export class ResultDialogComponent {
  public title: string;

  public desc: string;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<
      boolean,
      {
        title: string;
        desc: string;
      }
    >
  ) {
    const { title = '', desc = '' } = this.context?.data;
    this.title = title;
    this.desc = desc;
  }

  public onClose() {
    this.context.completeWith(true);
  }
}
