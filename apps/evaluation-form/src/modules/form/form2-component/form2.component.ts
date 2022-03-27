import { Component } from '@angular/core';

@Component({
  selector: 'school-evaluation-form-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss'],
})
export class Form2Component {
  readonly data = [
    {
      name: 'Alex Inkin',
      balance: 1323525,
    },
    {
      name: 'Roman Sedov',
      balance: 423242,
    },
  ] as const;

  readonly columns = Object.keys(this.data[0]);
}
