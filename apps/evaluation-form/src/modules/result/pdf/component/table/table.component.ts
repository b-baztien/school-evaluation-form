import { Component, Input, OnInit } from '@angular/core';
import {
  FormStaff,
  TableBody,
  UserForm,
} from '@school-evaluation-form/api-interfaces';

@Component({
  selector: 'school-evaluation-form-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() userForm!: Partial<UserForm>;

  formStaffListForPrint: FormStaff[] = [];

  constructor() {}

  ngOnInit(): void {
    for (const iterator of this.userForm.formStaff!) {
      this.formStaffListForPrint.push(JSON.parse(JSON.stringify(iterator)));

      let tableBody = [];
      for (const iterator2 of iterator.tableBody!) {
        let tableInside = [];

        for (
          let index = 2;
          index <= iterator2.tableInside!.length;
          index += 2
        ) {
          const tableInsideSlice = JSON.parse(
            JSON.stringify(iterator2.tableInside!.slice(index - 2, index))
          );

          tableInside.push(tableInsideSlice);
        }

        tableBody.push({
          ...iterator2,
          tableInside,
        });
      }
      this.formStaffListForPrint[
        this.formStaffListForPrint.length - 1
      ].tableBody = tableBody;
    }
  }

  splitTable(tableBody: TableBody) {
    return tableBody.tableInside.map((tableInside) => {
      const tableBodySplit = JSON.parse(JSON.stringify(tableBody)) as TableBody;
      if (tableBody.tableInside.indexOf(tableInside) > 0) {
        tableBodySplit.tableMainHeading = undefined;
      }

      tableBodySplit.tableInside = JSON.parse(JSON.stringify(tableInside));

      return tableBodySplit;
    });
  }
}
