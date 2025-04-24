import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { entityDetailsReducer } from '../components/entity-details-form/store/entity-details.reducers';
import { entityInfoReducer } from '../components/entity-filledby/store/entity-info.reducer';
import { boReducer } from '../components/rekyc-bo-form/store/rekyc-bo.reducer';
import { rekycDirectorReducer } from '../components/rekyc-declaration-form/components/rekyc-bo-form/rekyc-directors-form/store/declaration-directors.reducers';
import {
  ausInfoReducer,
  personalDetailsReducer,
} from '../components/rekyc-personal-details/store/personal-details.reducer';
import { updateRekycFormStatus, updateRekycStepStatus } from './rekyc-form.action';
import { ReKYCFormState } from './rekyc-form.state';

export interface FormStatus {
  steps: {
    entityDocs: boolean;
    personalDocs: boolean;
    directorDetails: boolean;
    boDetails: boolean;
    rekycForm: boolean;
    eSign: boolean;
  };
  forms: {
    entityDetails: boolean;
    ausDetails: boolean;
    rekycForm: boolean;
    eSign: boolean;
  };
}

export const initialFormStatus: FormStatus = (() => {
  const steps = {
    entityDocs: false,
    personalDocs: false,
    directorDetails: false,
    boDetails: false,
    rekycForm: false,
    eSign: false,
  };

  const forms = {
    entityDetails: steps.entityDocs && steps.directorDetails && steps.boDetails,
    ausDetails: false,
    rekycForm: false,
    eSign: false,
  };

  return { steps, forms };
})();

export const formStatusReducer = createReducer(
  initialFormStatus,
  on(updateRekycStepStatus, (state, payload) => {
    return {
      ...state,
      steps: {
        ...state.steps,
        ...payload,
      },
    };
  }),
  on(updateRekycFormStatus, (state, payload) => {
    return {
      ...state,
      forms: {
        ...state.forms,
        ...payload,
      },
    };
  }),
);

export const rekycFormReducers: ActionReducerMap<ReKYCFormState> = {
  entityInfo: entityInfoReducer,
  ausInfo: ausInfoReducer,
  entityDetails: entityDetailsReducer,
  director: rekycDirectorReducer,
  bo: boReducer,
  personalDetails: personalDetailsReducer,
  formStatus: formStatusReducer,
};
