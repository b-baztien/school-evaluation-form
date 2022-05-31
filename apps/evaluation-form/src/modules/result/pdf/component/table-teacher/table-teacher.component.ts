import { Component, Input, OnInit } from '@angular/core';
import { UserForm } from '@school-evaluation-form/api-interfaces';

@Component({
  selector: 'school-evaluation-form-table-teacher',
  templateUrl: './table-teacher.component.html',
  styleUrls: ['./table-teacher.component.scss'],
})
export class TableTeacherComponent implements OnInit {
  @Input() userForm!: Partial<UserForm>;

  constructor() {}

  ngOnInit(): void {}
}
