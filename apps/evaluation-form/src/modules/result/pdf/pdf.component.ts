import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'school-evaluation-form-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PdfComponent {
  public openPrint() {
    window.print();
  }
}
