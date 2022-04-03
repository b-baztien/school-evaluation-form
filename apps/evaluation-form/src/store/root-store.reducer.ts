import { createReducer, on } from '@ngrx/store';
import { FormUser } from '../interfaces/form-user.interface';
import { Stepper } from '../interfaces/stepper.interface';
import { backStep, nextStep, resetStep, submitForm } from './root-store.action';

export interface AppState {
  stepper: Stepper;
  formUser: Partial<FormUser>;
}

export const initialState: Stepper = {
  stepIndex: 0,
  listFormStep: ['ข้อมูลผู้ทำแบบประเมิน', 'กรอกแบบประเมิน', 'อัพโหลดไฟล์'],
};

export const stepperReducer = createReducer<Stepper>(
  initialState,

  on(resetStep, () => {
    return { ...initialState };
  }),

  on(backStep, (state) => {
    if (
      state.stepIndex - 1 < state.listFormStep.length &&
      state.stepIndex - 1 >= 0
    ) {
      return { ...state, stepIndex: state.stepIndex - 1 };
    }
    return { ...state };
  }),

  on(nextStep, (state) => {
    if (
      state.stepIndex + 1 < state.listFormStep.length &&
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
