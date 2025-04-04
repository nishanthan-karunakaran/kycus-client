import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { ReKycApplication } from 'src/app/features/rekyc/rekyc.model';

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
}

export interface ReKycState extends EntityState<ReKycApplication> {
  reKycApplications: ReKycApplication[];
  paginationInfo: PaginationInfo;
}

export const rekycAdapter = createEntityAdapter<ReKycApplication>();

export const initialReKycState: ReKycState = rekycAdapter.getInitialState({
  reKycApplications: [],
  paginationInfo: {
    currentPage: 1,
    totalPages: 1,
  },
});
