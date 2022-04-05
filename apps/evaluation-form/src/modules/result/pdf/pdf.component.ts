import { Component } from '@angular/core';

@Component({
  selector: 'school-evaluation-form-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class PdfComponent {
  public openPrint() {
    window.print();
  }
}
