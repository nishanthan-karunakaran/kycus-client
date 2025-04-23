import { EntityDetails } from '../components/entity-details-form/store/entity-details.state';
import { EntityInfoState } from '../components/entity-filledby/store/entity-info.reducer';
import { DirectorState } from '../components/rekyc-declaration-form/components/rekyc-bo-form/rekyc-directors-form/store/declaration-directors.state';
import { DeclarationState } from '../components/rekyc-declaration-form/store/declaration-form.state';
import { AusInfoState } from '../components/rekyc-personal-details/store/personal-details.reducer';
import { PersonalDetails } from '../components/rekyc-personal-details/store/personal-details.state';

export interface ReKYCFormState {
  entityInfo: EntityInfoState;
  ausInfo: AusInfoState;
  entityDetails: EntityDetails;
  declaration: DeclarationState;
  director: DirectorState;
  personalDetails: PersonalDetails;
}
