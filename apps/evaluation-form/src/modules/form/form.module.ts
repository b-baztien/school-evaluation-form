import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { SharedModule } from '../../utils/shared/shared.module';
import { FormComponent } from './component/form.component';
import { FormRoutingModule } from './form-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FormComponent],
  imports: [
    CommonModule,
    TuiFieldErrorPipeModule,
    SharedModule,
    FormRoutingModule,
  ],
})
export class FormModule {}
