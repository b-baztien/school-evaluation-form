import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormStaff,
  TableBody,
  TableInside,
  UserForm,
} from '@school-evaluation-form/api-interfaces';
import { tuiPure } from '@taiga-ui/cdk';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'school-evaluation-form-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() userForm!: Partial<UserForm>;
  tableList = new BehaviorSubject<ElementRef<HTMLElement>[]>([]);

  @ViewChildren('table') set tableQueryList(queryList: QueryList<ElementRef>) {
    this.tableList.next(queryList.toArray());
  }

  @ViewChild('divTable', { static: true, read: ElementRef })
  divTableEl!: ElementRef<HTMLElement>;

  formStaffListForPrint: FormStaff[] = [];

  constructor(private elementRef: ElementRef) {}

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
          ) as Partial<TableInside>[];

          const tableLength: number = tableInsideSlice.reduce(
            (acc: any, cur: any) => {
              return acc + cur.tablePerformance.length;
            },
            0
          );

          if (tableLength > 10) {
            for (const item of tableInsideSlice) {
              tableInside.push([JSON.parse(JSON.stringify(item))]);
            }
            continue;
          }

          tableInside.push(tableInsideSlice);
        }

        tableBody.push({
          ...iterator2,
          tableInside,
        });
      }
      this.formStaffListForPrint[
        this.formStaffListForPrint.length - 1
      ].tableBody = tableBody as any;
    }
  }

  ngAfterViewInit(): void {
    this.tableList.subscribe((elements) => {
      for (const element of elements) {
        const parentElement = this.elementRef.nativeElement.parentElement
          .parentElement as HTMLElement;
        const newPageElement = parentElement.querySelectorAll('.new-page');
        const elementRef = newPageElement.item(
          newPageElement.length - 1
        ) as HTMLElement;

        if (elements.indexOf(element) === 0) {
          element.nativeElement.classList.remove('new-page');
        }
      }
    });
  }

  @tuiPure
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

  @tuiPure
  sumTotalAvarageScore(listTableBody: TableBody[]) {
    let totalScore = 0;
    let totalComponent = 0;
    for (const item of listTableBody) {
      totalScore += item.tableInside.reduce((acc2, cur2) => {
        return acc2 + cur2.score!;
      }, 0);

      totalComponent += item.tableInside.reduce((acc3, cur3) => {
        return acc3 + cur3.tablePerformance.length;
      }, 0);
    }
    return totalScore / totalComponent;
  }
}
