import { createFeatureSelector, createSelector } from '@ngrx/store';
import { rekycAdapter, ReKycState } from './rekyc.state';

const reKycState = createFeatureSelector<ReKycState>('rekyc');

const { selectAll, selectEntities } = rekycAdapter.getSelectors(reKycState);

const selectReKycApplications = selectAll;

const selectReKycApplicationById = (_id: string) =>
  createSelector(selectEntities, (entities) => entities[_id]);

const selectReKycApplicationsByState = (state: string) =>
  createSelector(selectAll, (applications) => applications.filter((app) => app.status === state));

export const rekycSelectors = {
  selectReKycApplications,
  selectReKycApplicationById,
  selectReKycApplicationsByState,
};
