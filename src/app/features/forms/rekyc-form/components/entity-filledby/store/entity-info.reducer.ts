import { createReducer, on } from '@ngrx/store';
import { setEntityInfo } from './entity-info.actions';

export interface EntityInfoState {
  entityId: string;
  entityName: string;
  entityFilledBy: null | string;
}

export const initialEntityInfoState: EntityInfoState = {
  entityId: '',
  entityName: '',
  entityFilledBy: null,
};

export const entityInfoReducer = createReducer(
  initialEntityInfoState,
  on(setEntityInfo, (state, payload) => ({
    ...state,
    ...payload,
  })),
);
