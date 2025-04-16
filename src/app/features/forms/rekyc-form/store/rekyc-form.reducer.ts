import { ActionReducerMap } from '@ngrx/store';
import { ReKYCFormState } from './rekyc-form.state';
import { entityInfoReducer } from '../components/entity-filledby/store/entity-info.reducer';
import {
  ausInfoReducer,
  personalDetailsReducer,
} from '../components/rekyc-personal-details/store/personal-details.reducer';
import { entityDetailsReducer } from '../components/entity-details-form/store/entity-details.reducers';
import { declarationReducer } from '../components/rekyc-declaration-form/store/declaration-form.reducers';

export const rekycFormReducers: ActionReducerMap<ReKYCFormState> = {
  entityInfo: entityInfoReducer,
  ausInfo: ausInfoReducer,
  entityDetails: entityDetailsReducer,
  declaration: declarationReducer,
  personalDetails: personalDetailsReducer,
};
