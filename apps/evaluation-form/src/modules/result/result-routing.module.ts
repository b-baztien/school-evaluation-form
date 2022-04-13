import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultComponent } from './components/result.component';
import { PdfComponent } from './pdf/pdf.component';

const routes: Routes = [
  { path: '', component: ResultComponent },
  { path: 'pdf', component: PdfComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultRoutingModule {}
