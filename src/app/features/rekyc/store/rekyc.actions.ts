import { createAction, props } from '@ngrx/store';
import { ReKycApplication } from 'src/app/features/rekyc/rekyc.model';

export const fetchReKycApplications = createAction(
  '[REKYC] Load Applications',
  props<{ applications?: ReKycApplication[]; error?: string }>(),
);
