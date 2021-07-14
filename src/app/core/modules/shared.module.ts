import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AddClientDialogComponent,
  ConfirmDialogComponent,
  ResultDialogComponent,
} from '../dialogs';
import { TuiModule } from './tui.module';

@NgModule({
  declarations: [
    AddClientDialogComponent,
    ConfirmDialogComponent,
    ResultDialogComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TuiModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, TuiModule],
})
export class SharedModule {}
