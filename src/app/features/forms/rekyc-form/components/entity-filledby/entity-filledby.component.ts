import { Component, signal } from '@angular/core';
import { EntityFilledBy, RekycEntityFilledbyService } from './entity-filledby.service';
import { ToastService } from '@src/app/shared/ui/toast/toast.service';
import { ApiStatus } from '@core/constants/api.response';

@Component({
  selector: 'rekyc-entity-filledby',
  templateUrl: './entity-filledby.component.html',
})
export class RekycEntityFilledbyComponent {
  showFlow = signal(true);
  selectedFilledBy = signal(1);
  ausList = [
    {
      id: 1,
      label: 'AUS 1',
      value: '12345678',
    },
    {
      id: 2,
      label: 'AUS 2',
      value: '87654321',
    },
    {
      id: 3,
      label: 'AUS 3',
      value: '12345678',
    },
  ];
  selectedAusId = '';
  othersEmail = '';
  isLoading = signal(false);

  constructor(
    private entityFilledByService: RekycEntityFilledbyService,
    private toast: ToastService,
  ) {}

  setOthersEmail(event: string | number | boolean) {
    this.othersEmail = event as string;
  }

  updateEntityFilledBy() {
    const payload: EntityFilledBy = {
      ausId: '',
    };
    if (this.selectedFilledBy() === 1) {
      payload.email = this.othersEmail;
    }

    this.entityFilledByService.updateEntityFilledBy(payload).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isLoading.set(loading);

        if (!loading || !response) return;

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          this.toast.success('Entity filled by details saved successfully!');
        } else {
          this.toast.error(response.message || 'Something went wrong!');
        }
      },
    });
  }
}
