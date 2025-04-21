import { createReducer, on } from '@ngrx/store';
import { setEntityInfo, updateEntityFilledBy } from './entity-info.actions';

export interface EntityInfoState {
  entityId: string;
  entityName: string;
  entityFilledBy: null | string;
}

export const initialEntityInfoState: EntityInfoState = {
  entityId: 'jlnpvtltd-CUS62099-21042025',
  entityName: 'JLN Pvt Ltd',
  entityFilledBy: null,
};

export const entityInfoReducer = createReducer(
  initialEntityInfoState,
  on(setEntityInfo, (state, payload) => ({
    ...state,
    ...payload,
  })),
  on(updateEntityFilledBy, (state, payload) => ({
    ...state,
    ...payload,
  })),
);
