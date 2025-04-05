import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ApiStatus } from 'src/app/core/constants/api.response';
import {
  GetReKycApplicationsParams,
  GetReKycApplicationsResponse,
  ReKycApplication,
} from './rekyc.model';
import { RekycService } from './rekyc.service';
import * as ReKycActions from './store/rekyc.actions';
import { rekycSelectors } from './store/rekyc.selectors';

@Component({
  selector: 'app-rekyc',
  templateUrl: './rekyc.component.html',
  styleUrls: ['./rekyc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycComponent implements DoCheck, OnInit {
  searchInput = '';
  activePage = 1;
  isModalOpen = false;
  selectedReKycEntity: ReKycApplication | null = null;
  isApplicationsLoading = false;
  reKycApplications: ReKycApplication[] = [];
  stateSubscription!: Subscription;
  private readonly ROWS_PER_PAGE = 10;

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

  ngDoCheck(): void {
    // eslint-disable-next-line no-console
    console.log('rendeing');
  }

  handleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  handleReKycSheet(data: ReKycApplication | null = null) {
    this.selectedReKycEntity = data;
  }

  onSearchInputChange(event: string): void {
    this.searchInput = event;
  }

  setActivePage(page: number): void {
    this.activePage = page;
  }

  trackByKey(_: number, key: string): string {
    return key;
  }

  trackRow(_: number, rekycAppReKycApplication: ReKycApplication): string {
    return rekycAppReKycApplication._id;
  }

  get filteredReKycApplications(): ReKycApplication[] {
    const query = this.searchInput.toLowerCase();
    const start = this.activePage * this.ROWS_PER_PAGE - this.ROWS_PER_PAGE;
    const end = this.activePage * this.ROWS_PER_PAGE;

    return this.reKycApplications
      .slice(start, end)
      .filter((rekycApplication) => rekycApplication.entityName?.toLowerCase().includes(query));
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
