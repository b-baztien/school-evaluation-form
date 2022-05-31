import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../utils/shared/shared.module';
import { ChartComponent } from './chart/chart.component';
import { ResultComponent } from './components/result.component';
import { PdfComponent } from './pdf/pdf.component';
import { ResultRoutingModule } from './result-routing.module';
import { TableComponent } from './pdf/component/table/table.component';
import { TableTeacherComponent } from './pdf/component/table-teacher/table-teacher.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ResultComponent,
    PdfComponent,
    ChartComponent,
    TableComponent,
    TableTeacherComponent,
  ],
  imports: [CommonModule, ResultRoutingModule, SharedModule],
})
export class ResultModule {}
