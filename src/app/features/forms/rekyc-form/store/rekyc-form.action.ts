import { createAction, props } from '@ngrx/store';
import { FormStatus } from './rekyc-form.reducer';

export const updateRekycStepStatus = createAction(
  '[FormStatus] Update FormStatus',
  props<Partial<FormStatus>>(),
);

export const updateRekycFormStatus = createAction(
  '[FormStatus] Update FormStatus',
  props<Partial<FormStatus>>(),
);
