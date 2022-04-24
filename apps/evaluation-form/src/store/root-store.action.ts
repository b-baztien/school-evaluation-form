import { createAction, props } from '@ngrx/store';
import { UserForm } from '@school-evaluation-form/api-interfaces';

export const submitForm = createAction(
  '[UserForm Page] Submit Form',
  props<Partial<UserForm>>()
);

export const backStep = createAction('[Form Page] Go Back Step');

export const nextStep = createAction('[Form Page] Go Next Step');

export const resetStep = createAction('[Form Page] Reset Step');
