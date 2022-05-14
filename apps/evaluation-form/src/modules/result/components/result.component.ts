import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserForm } from '@school-evaluation-form/api-interfaces';
import { sum, TuiDestroyService } from '@taiga-ui/cdk';
import { RootStoreService } from 'apps/evaluation-form/src/services/root-store/root-store.service';
import { first, takeUntil } from 'rxjs';

interface ResultChart {
  header: string;
  listResultChart: {
    title: string;
    value: number[];
  }[];
  totalScore: number;
}
@Component({
  selector: 'school-evaluation-form-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  listResultChart: ResultChart[] = [];

  userForm!: Partial<UserForm>;

  constructor(
    private rootStoreService: RootStoreService,
    private destroy$: TuiDestroyService
  ) {
    this.rootStoreService.formUser$
      .pipe(first(), takeUntil(this.destroy$))
      .subscribe((data) => {
        this.userForm = data;

        for (const tableBody of this.userForm.formStaff?.[0].tableBody ?? []) {
          let resultChart: ResultChart = {
            header: tableBody.tableMainHeading as string,
            listResultChart: [],
            totalScore: tableBody.totalScore!,
          };

          resultChart.listResultChart = tableBody.tableInside.map((item) => {
            return {
              title: item.tableHeading ?? '',
              value: [item.score!, item.totalScore!],
            };
          });

          this.listResultChart = [...this.listResultChart, resultChart];
        }
      });
  }

  show() {
    window.open('/result/pdf', '_blank');
  }
}
