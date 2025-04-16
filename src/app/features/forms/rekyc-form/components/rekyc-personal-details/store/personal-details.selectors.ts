import { createSelector } from '@ngrx/store';
import { selectRekycFormState } from '@features/forms/rekyc-form/store/rekyc-form.selectors';
import { ReKYCFormState } from '@features/forms/rekyc-form/store/rekyc-form.state';

export const selectAusInfo = createSelector(
  selectRekycFormState,
  (state: ReKYCFormState) => state.ausInfo,
);

export const selectPersonalDetails = createSelector(
  selectRekycFormState,
  (state: ReKYCFormState) => state.personalDetails,
);
