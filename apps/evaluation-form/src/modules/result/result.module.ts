import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { SharedModule } from '../../utils/shared/shared.module';
import { ResultComponent } from './components/result.component';
import { PdfComponent } from './pdf/pdf.component';

@NgModule({
  declarations: [ResultComponent, PdfComponent],
  imports: [CommonModule, ResultRoutingModule, SharedModule],
})
export class ResultModule {}
