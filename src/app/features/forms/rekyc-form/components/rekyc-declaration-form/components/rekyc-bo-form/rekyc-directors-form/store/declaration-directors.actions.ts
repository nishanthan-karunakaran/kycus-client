import { createAction, props } from '@ngrx/store';
import { DirectorState } from './declaration-directors.state';

export const updatePartialDirectors = createAction(
  '[Declaration<Directors>] Update Partial Directors',
  props<Partial<DirectorState>>(),
);
