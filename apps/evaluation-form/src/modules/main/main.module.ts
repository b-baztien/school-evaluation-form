import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { SharedModule } from '../../utils/shared/shared.module';
import { MainComponent } from './component/main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    TuiFieldErrorPipeModule,
    SharedModule,
  ],
})
export class MainModule {}
