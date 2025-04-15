import { createFeatureSelector } from '@ngrx/store';
import { ReKYCFormState } from './rekyc-form.state';

export const selectRekycFormState = createFeatureSelector<ReKYCFormState>('rekycForm');
