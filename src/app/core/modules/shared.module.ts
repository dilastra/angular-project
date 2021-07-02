import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../dialogs';
import { TuiModule } from './tui.module';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [TuiModule],
  exports: [
    CommonModule,
    ConfirmDialogComponent,
    FormsModule,
    ReactiveFormsModule,
    TuiModule,
  ],
})
export class SharedModule {}
