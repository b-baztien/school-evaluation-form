import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './component/form.component';
import { SharedModule } from '../../utils/shared/shared.module';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FormComponent],
  imports: [
    CommonModule,
    TuiCurrencyPipeModule,
    SharedModule,
    FormRoutingModule,
  ],
})
export class FormModule {}
