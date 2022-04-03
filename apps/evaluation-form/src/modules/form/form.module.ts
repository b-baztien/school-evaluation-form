import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { InputNumberDirective } from '../../directives/input-number/input-number.directive';
import { SharedModule } from '../../utils/shared/shared.module';
import { FormComponent } from './component/form.component';
import { FormRoutingModule } from './form-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { Form1Component } from './form1/form1.component';
import { Form2Component } from './form2/form2.component';
import { FormService } from '../../services/form/form.service';
import { UploadFormComponent } from './upload-form/upload-form.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    FormComponent,
    InputNumberDirective,
    UserFormComponent,
    Form1Component,
    Form2Component,
    UploadFormComponent,
  ],
  imports: [
    CommonModule,
    TuiFieldErrorPipeModule,
    SharedModule,
    FormRoutingModule,
  ],
  providers: [FormService],
})
export class FormModule {}
