import { createReducer, on } from '@ngrx/store';
import {
  setAusInfo,
  setPersonalDetails,
  updatePartialPersonalDetails,
  updatePersonalDetails,
} from './personal-details.actions';
import { initialPersonalDetails } from './personal-details.state';

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

export const personalDetailsReducer = createReducer(
  initialPersonalDetails,
  on(setPersonalDetails, (state, payload) => {
    return { ...state, ...payload };
  }),
  on(updatePersonalDetails, (state, { key, data }) => {
    return {
      ...state,
      [key]: {
        ...state[key],
        ...data,
      },
    };
  }),
  on(updatePartialPersonalDetails, (state, { partialData }) => ({
    ...state,
    ...partialData,
  })),
);
