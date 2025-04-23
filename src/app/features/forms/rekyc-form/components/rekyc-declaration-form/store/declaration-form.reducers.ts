import { createReducer } from '@ngrx/store';
import { DeclarationState } from './declaration-form.state';

export const initialState: DeclarationState = {
  director: {
    directorList: [],
    isDirectorModified: false,
    form32: { name: null, link: null },
  },
};

export const declarationReducer = createReducer(initialState);
