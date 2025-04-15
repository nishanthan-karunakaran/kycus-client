import { EntityInfoState } from '../components/entity-filledby/store/entity-info.reducer';
import { AusInfoState } from '../components/rekyc-personal-details/store/personal-details.reducer';

export interface ReKYCFormState {
  entityInfo: EntityInfoState;
  ausInfo: AusInfoState;
}
