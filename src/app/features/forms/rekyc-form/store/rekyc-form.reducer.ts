import { ActionReducerMap } from '@ngrx/store';
import { ReKYCFormState } from './rekyc-form.state';
import { entityInfoReducer } from '../components/entity-filledby/store/entity-info.reducer';
import { ausInfoReducer } from '../components/rekyc-personal-details/store/personal-details.reducer';
import { entityDetailsReducer } from '../components/entity-details-form/store/entity-details.reducers';

export const rekycFormReducers: ActionReducerMap<ReKYCFormState> = {
  entityInfo: entityInfoReducer,
  ausInfo: ausInfoReducer,
  entityDetails: entityDetailsReducer,
};
