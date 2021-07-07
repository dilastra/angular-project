import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClientDialogComponent, ConfirmDialogComponent } from '../dialogs';
import { TuiModule } from './tui.module';

@NgModule({
  declarations: [ConfirmDialogComponent, AddClientDialogComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TuiModule],
  exports: [
    CommonModule,
    ConfirmDialogComponent,
    FormsModule,
    ReactiveFormsModule,
    TuiModule,
  ],
})
export class SharedModule {}
