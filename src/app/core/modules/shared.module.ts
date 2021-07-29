import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AddClientDialogComponent,
  ConfirmDialogComponent,
  ResultDialogComponent,
} from '../dialogs';
import { TuiModule } from './tui.module';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AddClientDialogComponent,
    ConfirmDialogComponent,
    ResultDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiModule,
    TextMaskModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiModule,
    TextMaskModule,
  ],
})
export class SharedModule {}
