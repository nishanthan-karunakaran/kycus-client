import { createAction, props } from '@ngrx/store';
import { DirectorState } from './declaration-directors.state';

export const setDirectorsState = createAction(
  '[Directors] Set Directors State',
  props<DirectorState>(),
);

export const updatePartialDirectors = createAction(
  '[Directors] Update Partial Directors',
  props<Partial<DirectorState>>(),
);

export const removeDirector = createAction(
  '[Directors] Remove Director',
  props<{ dirId: string }>(),
);
