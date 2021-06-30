import { NgModule } from '@angular/core';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiFieldErrorModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiSelectModule,
  TuiToggleModule,
} from '@taiga-ui/kit';

@NgModule({
  exports: [
    TuiButtonModule,
    TuiDataListModule,
    TuiErrorModule,
    TuiFieldErrorModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiLoaderModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiToggleModule,
  ],
})
export class TuiModule {}
