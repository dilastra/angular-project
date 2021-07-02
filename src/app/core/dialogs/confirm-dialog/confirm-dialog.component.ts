import { Component, Inject, OnInit } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'credex-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  public title: string;

  public desc: string;

  public titleSubmitButton: string;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<
      boolean,
      { title: string; desc: string; titleSubmitButton: string }
    >
  ) {
    const { title, desc, titleSubmitButton } = this.context.data;
    this.title = title;
    this.desc = desc;
    this.titleSubmitButton = titleSubmitButton;
  }

  public onConfirm() {
    this.context.completeWith(true);
  }

  public onCancel() {
    this.context.completeWith(false);
  }
}
