import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import {
  TableInside,
  User,
  UserForm,
} from '@school-evaluation-form/api-interfaces';
import { tuiPure } from '@taiga-ui/cdk';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import 'dayjs/plugin/customParseFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/plugin/buddhistEra';
import buddhistEra from 'dayjs/plugin/buddhistEra';

@Component({
  selector: 'school-evaluation-form-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PdfComponent implements AfterViewInit {
  userForm!: Partial<UserForm>;

  constructor() {
    document.querySelector('nav')!.style.display = 'none';
    document.querySelector('footer')!.style.display = 'none';
  }

  ngOnInit(): void {
    this.userForm = JSON.parse(
      localStorage.getItem('userForm')!.toString()
    ) as Partial<UserForm>;
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   window.print();
    // }, 1000);
  }

  removeParentheses(message: string) {
    return message.slice(0, message.indexOf('('));
  }

  @tuiPure
  sumAverageScore(tableInside: TableInside[], score: number) {
    return (
      tableInside.reduce((acc, cur) => {
        return acc + cur.tablePerformance.length * 4;
      }, 0) / score
    );
  }

  @tuiPure
  convertThaiDate(date: Date) {
    dayjs.extend(buddhistEra);
    dayjs.extend(customParseFormat);
    dayjs.locale('th');
    const dateFormat = dayjs(date).format('DD MMMM BBBB');
    return dateFormat;
  }
}
