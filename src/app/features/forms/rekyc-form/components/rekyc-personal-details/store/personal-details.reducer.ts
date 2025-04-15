import { createReducer, on } from '@ngrx/store';
import { setAusInfo } from './personal-details.actions';

export interface AusInfoState {
  ausId: null | string;
  ausName: null | string;
  ausType: null | string;
  isAuthenticated: boolean;
}

export const initialAusInfoState: AusInfoState = {
  ausId: null,
  ausName: null,
  ausType: null,
  isAuthenticated: false,
};

export const ausInfoReducer = createReducer(
  initialAusInfoState,
  on(setAusInfo, (state, payload) => ({
    ...state,
    ...payload,
  })),
);
