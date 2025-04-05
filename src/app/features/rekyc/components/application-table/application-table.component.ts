import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  GetReKycApplicationsParams,
  GetReKycApplicationsResponse,
  ReKycApplication,
} from 'src/app/features/rekyc/rekyc.model';
import { RekycService } from 'src/app/features/rekyc/rekyc.service';
import { rekycSelectors } from 'src/app/features/rekyc/store/rekyc.selectors';
import * as ReKycActions from 'src/app/features/rekyc/store/rekyc.actions';
import { Store } from '@ngrx/store';
import { ApiStatus } from 'src/app/core/constants/api.response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rekyc-application-table',
  templateUrl: './application-table.component.html',
})
export class ApplicationTableComponent implements OnInit {
  searchInput = '';
  activePage = 1;
  isModalOpen = false;
  selectedReKycEntity: ReKycApplication | null = null;
  isApplicationsLoading = false;
  reKycApplications: ReKycApplication[] = [];
  stateSubscription!: Subscription;
  readonly ROWS_PER_PAGE = 10;

  constructor(
    private store: Store,
    private rekycService: RekycService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.stateSubscription = this.store
      .select(rekycSelectors.selectReKycApplications)
      .subscribe((apps) => {
        this.reKycApplications = apps;
      });

    this.getReKycApplications();
  }

  get filteredReKycApplications(): ReKycApplication[] {
    const query = this.searchInput.toLowerCase();
    const start = this.activePage * this.ROWS_PER_PAGE - this.ROWS_PER_PAGE;
    const end = this.activePage * this.ROWS_PER_PAGE;

    return this.reKycApplications
      .slice(start, end)
      .filter((rekycApplication) => rekycApplication.entityName?.toLowerCase().includes(query));
  }

  handleReKycSheet(data: ReKycApplication | null = null) {
    this.selectedReKycEntity = data;
  }

  onSearchInputChange(event: string): void {
    this.searchInput = event;
  }

  trackRow(_: number, rekycAppReKycApplication: ReKycApplication): string {
    return rekycAppReKycApplication._id;
  }

  setActivePage(page: number): void {
    this.activePage = page;
  }

  handleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  getReKycApplications() {
    const params: GetReKycApplicationsParams = {
      page: this.activePage,
      limit: this.ROWS_PER_PAGE,
    };

    this.rekycService.getReKycApplications(params).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isApplicationsLoading = loading;

        if (!response) return;

        const { status, data } = response;

        if (status === ApiStatus.SUCCESS) {
          const { results } = data as GetReKycApplicationsResponse;
          this.store.dispatch(ReKycActions.fetchReKycApplications({ applications: results }));
          this.cdr.detectChanges();
        }
      },
    });
  }
}
