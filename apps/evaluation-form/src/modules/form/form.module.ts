import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './component/form.component';
import { SharedModule } from '../../utils/shared/shared.module';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, SharedModule, FormRoutingModule],
})
export class FormModule {}
