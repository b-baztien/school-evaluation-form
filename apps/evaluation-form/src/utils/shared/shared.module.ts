import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiModeModule,
  TuiNotificationsModule,
  TuiRootModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
} from '@taiga-ui/kit';

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
  ],
})
export class SharedModule {}
