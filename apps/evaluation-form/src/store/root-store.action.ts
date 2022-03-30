import { createAction, props } from '@ngrx/store';
import { FormUser } from '../interfaces/form-user.interface';

export const submitForm = createAction(
  '[UserForm Page] Submit Form',
  props<FormUser>()
);

export const backStep = createAction('[Form Page] Go Back Step');

export const nextStep = createAction('[Form Page] Go Next Step');

export const resetStep = createAction('[Form Page] Reset Step');
