import { Component, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@school-evaluation-form/api-interfaces';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiDialogSize,
} from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { FormService } from 'apps/evaluation-form/src/services/form/form.service';
import { RootStoreService } from 'apps/evaluation-form/src/services/root-store/root-store.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'school-evaluation-form-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy {
  destroy$ = new Subject<void>();
  formId!: string;

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private rootStoreService: RootStoreService,
    private router: Router
  ) {
    this.formId = localStorage.getItem('formId') ?? '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToForm(
    formId: string,
    content: PolymorpheusContent<TuiDialogContext>,
    header: PolymorpheusContent,
    size: TuiDialogSize
  ) {
    this.dialogService
      .open(content, {
        header,
        size,
      })
      .pipe(
        tap({
          next: () => {
            this.router.navigate(['/form']);
            this.rootStoreService.resetStep();
            localStorage.setItem('formId', formId);
            this.ngOnDestroy();
          },
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
