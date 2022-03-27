import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mapTo, merge, Subject, takeUntil, tap } from 'rxjs';
import { FormService } from '../../../services/form/form.service';

@Component({
  selector: 'school-evaluation-form-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnDestroy {
  formId!: string;

  listFormStep = [
    'ข้อมูลผู้ทำแบบประเมิน',
    'Second step',
    'Third step',
    'Fourth step',
  ];

  destroy$ = new Subject<void>();

  constructor(
    private activateRoute: ActivatedRoute,
    public formService: FormService
  ) {
    this.formId = this.activateRoute.snapshot.paramMap.get('university') ?? '';

    merge(
      this.formService.decreaseFormStepIndex$.pipe(mapTo(-1)),
      this.formService.increaseFormStepIndex$.pipe(mapTo(+1))
    )
      .pipe(
        tap({
          next: (value) => {
            if (
              this.formService.formStepIndex + value !==
              this.listFormStep.length
            )
              this.formService.formStepIndex += value;
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
