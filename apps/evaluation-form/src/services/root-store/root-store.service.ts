import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserForm } from '@school-evaluation-form/api-interfaces';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import {
  backStep,
  nextStep,
  resetStep,
  submitForm,
} from '../../store/root-store.action';
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

  isLastStep = new BehaviorSubject<boolean>(false);
  isFirstStep = new BehaviorSubject<boolean>(false);

  constructor(private store: Store<AppState>) {
    //TODO remove this
    const formUser: UserForm = {
      schoolName: 'แม่แป้นวิทยา',
      group: 'ขุนงาว',
      address: 'ที่อยู่',
      district: 'อำเภอ',
      province: 'ลำปาง',
      managerName: 'ชื่อผู้อำนวยการ',
      startPostionYear: '2565',
      managerPhone: '0812345678',
      fullname: 'ชื่อผู้รับผิดชอบ',
      startYear: '2565',
      phone: '0812345678',
      time: '1',
      date: new Date(),
      fileName: '',
      username: '001',
    };

    this.submitForm(formUser);

    this.stepper$.subscribe();

    this.effectStepChange();
  }

  private effectStepChange() {
    combineLatest([this.stepIndex$, this.maxStep$])
      .pipe(
        tap(([stepIndex, maxStep]) => {
          if (stepIndex === maxStep - 1) {
            this.isLastStep.next(true);
            return;
          }
          this.isLastStep.next(false);
        }),
        tap(([stepIndex]) => {
          if (stepIndex === 0) {
            this.isFirstStep.next(true);
            return;
          }
          this.isFirstStep.next(false);
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

  submitForm(form: Partial<UserForm>) {
    this.store.dispatch(submitForm(form));
  }

  resetStep() {
    this.store.dispatch(resetStep());
  }
}
