import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { SharedModule } from '../../utils/shared/shared.module';
import { MainComponent } from './component/main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    TuiFieldErrorPipeModule,
    SharedModule,
  ],
})
export class MainModule {}
