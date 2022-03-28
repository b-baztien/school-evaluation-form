import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, tap } from 'rxjs';
import { FormUser } from '../../interfaces/form-user.interface';
import { backStep, nextStep, submitForm } from '../../store/root-store.action';
import { AppState } from '../../store/root-store.reducer';

@Injectable({
  providedIn: 'root',
})
export class RootStoreService {
  stepper$ = this.store.select('stepper');
  stepIndex$ = this.store.select('stepper', 'stepIndex');
  listFormStep$ = this.store.select('stepper', 'listFormStep');
  maxStep$ = this.store.select('stepper', 'listFormStep', 'length');
  formUser$ = this.store.select('formUser');

  isLastStep = false;
  isFirstStep = false;

  constructor(private store: Store<AppState>) {
    this.stepper$.subscribe();

    this.effectStepChange();
  }

  private effectStepChange() {
    combineLatest([this.stepIndex$, this.maxStep$])
      .pipe(
        tap(([stepIndex, maxStep]) => {
          if (stepIndex === maxStep) {
            this.isLastStep = true;
          }
          this.isLastStep = false;
        }),
        tap(([stepIndex]) => {
          if (stepIndex === 0) {
            this.isFirstStep = true;
          }
          this.isFirstStep = false;
        })
      )
      .subscribe();
  }

  backStep() {
    this.store.dispatch(backStep());
  }

  nextStep() {
    this.store.dispatch(nextStep());
  }

  submitForm(form: FormUser) {
    this.store.dispatch(submitForm(form));
  }
}
