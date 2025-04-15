import { createReducer, on } from '@ngrx/store';
import { setAusInfo } from './personal-details.actions';

export interface AusInfoState {
  ausId: null | string;
  ausName: null | string;
  ausType: null | string;
}

export const initialAusInfoState: AusInfoState = {
  ausId: null,
  ausName: null,
  ausType: null,
};

export const ausInfoReducer = createReducer(
  initialAusInfoState,
  on(setAusInfo, (state, payload) => ({
    ...state,
    ...payload,
  })),
);
