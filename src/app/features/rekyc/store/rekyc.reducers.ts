import { createReducer, on } from '@ngrx/store';
import * as ReKycActions from './rekyc.actions';
import { initialReKycState, rekycAdapter } from './rekyc.state';

export const rekycReducer = createReducer(
  initialReKycState,

  on(ReKycActions.fetchReKycApplications, (state, { applications }) => {
    return rekycAdapter.setAll(applications ?? [], {
      ...state,
      reKycApplications: applications ?? [],
    });
  }),
);
