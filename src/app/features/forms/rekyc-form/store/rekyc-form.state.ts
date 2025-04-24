import { EntityDetails } from '../components/entity-details-form/store/entity-details.state';
import { EntityInfoState } from '../components/entity-filledby/store/entity-info.reducer';
import { BODetails } from '../components/rekyc-bo-form/store/rekyc-bo.state';
import { DirectorState } from '../components/rekyc-declaration-form/components/rekyc-bo-form/rekyc-directors-form/store/declaration-directors.state';
import { AusInfoState } from '../components/rekyc-personal-details/store/personal-details.reducer';
import { PersonalDetails } from '../components/rekyc-personal-details/store/personal-details.state';
import { FormStatus } from './rekyc-form.reducer';

export interface ReKYCFormState {
  entityInfo: EntityInfoState;
  ausInfo: AusInfoState;
  entityDetails: EntityDetails;
  director: DirectorState;
  bo: BODetails;
  personalDetails: PersonalDetails;
  formStatus: FormStatus;
}
