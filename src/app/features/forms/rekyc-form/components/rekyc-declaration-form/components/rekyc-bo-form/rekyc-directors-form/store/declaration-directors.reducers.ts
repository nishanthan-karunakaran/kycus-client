import { on } from '@ngrx/store';
import { updatePartialDirectors } from './declaration-directors.actions';
import { DeclarationState } from '@features/forms/rekyc-form/components/rekyc-declaration-form/store/declaration-form.state';

export const directorOnFns = [
  on(updatePartialDirectors, (state: DeclarationState, data) => ({
    ...state,
    director: {
      ...state.director,
      ...data,
    },
  })),
];
