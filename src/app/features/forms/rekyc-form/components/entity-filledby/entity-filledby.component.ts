import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiStatus } from '@core/constants/api.response';
import { Store } from '@ngrx/store';
import { ToastService } from '@src/app/shared/ui/toast/toast.service';
import { selectAusInfo } from '../rekyc-personal-details/store/personal-details.selectors';
import { AusDropDownList, AusListDropDownResponse, EntityFilledBy } from './entity-filledby.model';
import { RekycEntityFilledbyService } from './entity-filledby.service';
import { updateEntityFilledBy } from './store/entity-info.actions';
import { selectEntityInfo } from './store/entity-info.selectors';

@Component({
  selector: 'rekyc-entity-filledby',
  templateUrl: './entity-filledby.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycEntityFilledbyComponent implements OnInit {
  showFlow = signal(false);
  selectedFilledBy = signal(1);
  ausList = signal<AusDropDownList[]>([]);
  selectedAusId = '';
  othersEmail = '';
  readonly ausInfo = toSignal(this.store.select(selectAusInfo));
  readonly entityInfo = toSignal(this.store.select(selectEntityInfo));
  isLoading = signal(false);
  isOpen = signal(true);

  constructor(
    private store: Store,
    private entityFilledByService: RekycEntityFilledbyService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.fetchAusList();
  }

  setOthersEmail(event: string | number | boolean) {
    this.othersEmail = event as string;
  }

  updateEntityFilledBy() {
    const payload: EntityFilledBy = {
      ausId: this.ausInfo()?.ausId as string,
      type: 'AUS',
    };

    this.entityFilledByService.updateEntityFilledBy(payload).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isLoading.set(loading);

        if (response) {
          const { status } = response;

          if (status === ApiStatus.SUCCESS) {
            this.isOpen.set(false);
            this.toast.success('Entity filled by details saved successfully!');
            this.store.dispatch(updateEntityFilledBy({ entityFilledBy: payload.ausId }));
          } else {
            this.toast.error(response.message || 'Something went wrong!');
          }
        }
      },
    });
  }

  fetchAusList() {
    const ausId = this.ausInfo()?.ausId;

    if (!ausId) {
      // eslint-disable-next-line no-console
      console.warn('ausId not found to update entity filled by');
      return;
    }

    this.entityFilledByService.fetchAusList(ausId).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isLoading.set(loading);

        if (response) {
          const { status, data } = response as AusListDropDownResponse;

          if (status === ApiStatus.SUCCESS) {
            const ausDropDownList: AusDropDownList[] = data.authorizedSignatories
              .map((aus) => ({
                id: aus.ausId,
                label: aus.name,
                value: aus.ausId,
              }))
              .filter((aus) => aus.id !== ausId);
            this.ausList.set(ausDropDownList);
          }
        }
      },
    });
  }
}
