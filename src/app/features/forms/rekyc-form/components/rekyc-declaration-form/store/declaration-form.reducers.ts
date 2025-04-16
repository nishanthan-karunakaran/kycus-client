import { createReducer } from '@ngrx/store';
import { directorOnFns } from '../components/rekyc-bo-form/rekyc-directors-form/store/declaration-directors.reducers';
import { DeclarationState } from './declaration-form.state';

export const initialState: DeclarationState = {
  director: {
    directorList: [],
    isDirectorModified: false,
    form32: { name: null, link: null },
  },
};

export const declarationReducer = createReducer(initialState, ...directorOnFns);
