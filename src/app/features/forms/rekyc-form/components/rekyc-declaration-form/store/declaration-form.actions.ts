import { createAction, props } from '@ngrx/store';
import { DirectorState } from '../components/rekyc-bo-form/rekyc-directors-form/store/declaration-directors.state';

export const updatePartialDeclaration = createAction(
  '[Declaration] Update Partial Declaration',
  props<{
    director?: Partial<DirectorState>;
  }>(),
);
