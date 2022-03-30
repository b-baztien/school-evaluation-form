import { createReducer, on } from '@ngrx/store';
import { FormUser } from '../interfaces/form-user.interface';
import { Stepper } from '../interfaces/stepper.interface';
import { backStep, nextStep, submitForm } from './root-store.action';

export interface AppState {
  stepper: Stepper;
  formUser: Partial<FormUser>;
}

export const stepperReducer = createReducer<Stepper>(
  {
    stepIndex: 0,
    listFormStep: [
      'ข้อมูลผู้ทำแบบประเมิน',
      'กรอกแบบประเมิน',
      'Third step',
      'Fourth step',
    ],
  },

  on(backStep, (state) => {
    if (
      state.stepIndex - 1 !== state.listFormStep.length &&
      state.stepIndex - 1 >= 0
    ) {
      return { ...state, stepIndex: state.stepIndex - 1 };
    }
    return { ...state };
  }),

  on(nextStep, (state) => {
    if (
      state.stepIndex + 1 !== state.listFormStep.length &&
      state.stepIndex + 1 >= 0
    ) {
      return { ...state, stepIndex: state.stepIndex + 1 };
    }
    return { ...state };
  })
);

export const formUserReducer = createReducer<Partial<FormUser>>(
  {},
  on(submitForm, (_, action) => {
    return { ...action };
  })
);
