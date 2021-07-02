import { NgModule } from '@angular/core';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiFieldErrorModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiMarkerIconModule,
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
    TuiLinkModule,
    TuiLoaderModule,
    TuiMarkerIconModule,
    TuiSelectModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
    TuiToggleModule,
  ],
})
export class TuiModule {}
