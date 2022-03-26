import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiModeModule,
  TuiNotificationsModule,
  TuiRootModule,
  TuiSvgModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiFieldErrorModule,
  TuiFilterByInputPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
} from '@taiga-ui/kit';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiNotificationsModule,
    TuiAccordionModule,
    TuiIslandModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiButtonModule,
    TuiFieldErrorModule,
    TuiFilterByInputPipeModule,
    NgxSpinnerModule,
    TuiSvgModule,
  ],
})
export class SharedModule {}
