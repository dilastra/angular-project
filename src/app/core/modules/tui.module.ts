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
  TuiCheckboxLabeledModule,
  TuiComboBoxModule,
  TuiFieldErrorModule,
  TuiInputDateModule,
  TuiInputFileModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
  TuiInputPhoneModule,
  TuiMarkerIconModule,
  TuiSelectModule,
  TuiTabsModule,
  TuiTextAreaModule,
  TuiToggleModule,
} from '@taiga-ui/kit';

@NgModule({
  exports: [
    TuiAccordionModule,
    TuiButtonModule,
    TuiCheckboxLabeledModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiErrorModule,
    TuiFieldErrorModule,
    TuiInputDateModule,
    TuiInputFileModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiInputPasswordModule,
    TuiInputPhoneModule,
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
    TuiTextAreaModule,
    TuiTextfieldControllerModule,
    TuiToggleModule,
  ],
})
export class TuiModule {}
