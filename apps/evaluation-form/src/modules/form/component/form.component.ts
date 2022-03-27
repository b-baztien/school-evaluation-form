import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { mapTo, merge, Subject, takeUntil, tap } from 'rxjs';
import { FormService } from '../../../services/form/form.service';

@Component({
  selector: 'school-evaluation-form-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnDestroy {
  formStepIndex = 0;
  formId!: string;

  listFormStep = [
    'ข้อมูลผู้ทำแบบประเมิน',
    'Second step',
    'Third step',
    'Fourth step',
  ];

  destroy$ = new Subject<void>();

  constructor(private formService: FormService) {
    this.formId = localStorage.getItem('formId') ?? '';

    merge(
      this.formService.decreaseFormStepIndex$.pipe(mapTo(-1)),
      this.formService.increaseFormStepIndex$.pipe(mapTo(+1))
    )
      .pipe(
        tap({
          next: (value) => {
            if (
              this.formStepIndex + value !== this.listFormStep.length &&
              this.formStepIndex + value > 0
            )
              this.formStepIndex += value;
          },
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  prevForm() {
    this.formService.decreaseFormStepIndex$.next(null);
  }

  nextForm() {
    this.formService.canNext$.next(null);
  }
}
