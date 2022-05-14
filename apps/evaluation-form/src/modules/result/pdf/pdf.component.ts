import { Component, ViewEncapsulation } from '@angular/core';
import { UserForm } from '@school-evaluation-form/api-interfaces';

@Component({
  selector: 'school-evaluation-form-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PdfComponent {
  userForm: Partial<UserForm>;

  public openPrint() {
    window.print();
  }

  constructor() {
    document.querySelector('nav')!.style.display = 'none';
    document.querySelector('footer')!.style.display = 'none';

    this.userForm = JSON.parse(
      localStorage.getItem('userForm')!.toString()
    ) as Partial<UserForm>;

    console.log(this.userForm);
  }
}
