import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  exports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class SharedModule {}
