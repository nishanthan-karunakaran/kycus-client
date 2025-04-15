import { createAction, props } from '@ngrx/store';
import { AusInfoState } from './personal-details.reducer';

export const setAusInfo = createAction('[Aus Info] Set Aus Info', props<AusInfoState>());
