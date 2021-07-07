import { NgModule } from '@angular/core';
import {
  TuiTableModule,
  TuiTablePaginationModule,
} from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiComboBoxModule,
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
    TuiComboBoxModule,
    TuiDataListModule,
    TuiErrorModule,
    TuiFieldErrorModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiLetModule,
    TuiLinkModule,
    TuiLoaderModule,
    TuiMarkerIconModule,
    TuiScrollbarModule,
    TuiSelectModule,
    TuiSvgModule,
    TuiTableModule,
    TuiTablePaginationModule,
    TuiTextfieldControllerModule,
    TuiToggleModule,
  ],
})
export class TuiModule {}
