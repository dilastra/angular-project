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
  TuiAccordionModule,
  TuiComboBoxModule,
  TuiFieldErrorModule,
  TuiInputDateModule,
  TuiInputFileModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
  TuiMarkerIconModule,
  TuiSelectModule,
  TuiTabsModule,
  TuiToggleModule,
} from '@taiga-ui/kit';

@NgModule({
  exports: [
    TuiAccordionModule,
    TuiButtonModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiErrorModule,
    TuiFieldErrorModule,
    TuiInputDateModule,
    TuiInputFileModule,
    TuiInputModule,
    TuiInputNumberModule,
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
    TuiTabsModule,
    TuiTextfieldControllerModule,
    TuiToggleModule,
  ],
})
export class TuiModule {}
