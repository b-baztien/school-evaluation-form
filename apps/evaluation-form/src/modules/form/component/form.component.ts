import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'school-evaluation-form-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
