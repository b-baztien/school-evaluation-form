import { Component, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiDialogSize,
} from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'school-evaluation-form-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy {
  destroy$ = new Subject<void>();

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToForm(
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
        tap({ next: () => this.router.navigate(['/form']) }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
