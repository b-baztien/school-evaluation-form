import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../utils/shared/shared.module';
import { ResultComponent } from './components/result.component';
import { PdfComponent } from './pdf/pdf.component';
import { ResultRoutingModule } from './result-routing.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ResultComponent, PdfComponent],
  imports: [CommonModule, ResultRoutingModule, SharedModule],
})
export class ResultModule {}
