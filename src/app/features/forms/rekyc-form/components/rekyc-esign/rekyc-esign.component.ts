import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ApiStatus } from '@core/constants/api.response';
import { API_URL } from '@core/constants/apiurls';
import { EntitySignatoriesList } from '@features/forms/rekyc-form/rekyc-form.model';
import { Store } from '@ngrx/store';
import { ToastService } from '@src/app/shared/ui/toast/toast.service';
import { environment } from '@src/environments/environment';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { selectEntityInfo } from '../entity-filledby/store/entity-info.selectors';
import {
  EntityESignSignatoryList,
  ProceedEntityESign,
  RekycEsignService,
} from './rekyc-esign.service';

interface SignatoryStatus {
  id: string;
  email: string;
  name: string;
  type: string;
  status: string;
}

@Component({
  selector: 'app-rekyc-esign',
  templateUrl: './rekyc-esign.component.html',
})
export class RekycEsignComponent implements OnInit {
  entityInfo = toSignal(this.store.select(selectEntityInfo), { initialValue: null });
  entityId = computed(() => this.entityInfo()?.entityId);
  reportUrl: SafeResourceUrl = '';
  isFetching = signal(false);
  entityESignStatus = signal('');
  redirectUrl = signal('');
  showProceedESignSheet = signal(false);
  showESignStatusSheet = signal(false);
  isProceedingToESign = signal(false);
  selectedESignType = signal<'aadhaar' | 'dsc' | ''>('');
  showESignTypeModal = signal(false);
  signatoriesList = signal<EntitySignatoriesList[]>([]);
  selectedSignatories = signal<EntitySignatoriesList[]>([]);
  signatoryStatusList = signal<SignatoryStatus[]>([]);

  constructor(
    private rekycESignService: RekycEsignService,
    private store: Store,
    private toast: ToastService,
    private validatorsService: ValidatorsService,
  ) {
    effect(() => {
      const id = this.entityId();
      if (id) {
        this.reportUrl = `${environment.apiBaseUrl}${API_URL.APPLICATION.REKYC.ENTITY_ESIGN.ESIGN_PREVIEW_DOC(id)}`;
      }
    });
  }

  ngOnInit(): void {
    // this.fetchEntityESignParticipants();
    this.fetchEntityESignStatus();
  }

  trackSignatory(_index: number, signatory: EntitySignatoriesList) {
    return signatory.ausId || signatory.dirId;
  }

  trackSignatoryStatus(_index: number, signatory: SignatoryStatus) {
    return signatory.id;
  }

  getSignatoryStatus(signatory: SignatoryStatus) {
    return signatory.status === 'Signed';
  }

  handleProceedESignSheet() {
    this.showProceedESignSheet.set(!this.showProceedESignSheet());
  }

  handleESignStatusSheet() {
    this.showESignStatusSheet.set(!this.showESignStatusSheet());
  }

  handleESignTypeModal() {
    this.showESignTypeModal.set(!this.showESignTypeModal());
  }

  updateValue(signatory: EntitySignatoriesList, event: string | number | boolean) {
    const updatedList = this.signatoriesList().map((sign) => {
      if (sign?.ausId !== signatory?.ausId || sign?.dirId !== signatory?.dirId) {
        return sign;
      }

      const input = event as string;
      return {
        ...sign,
        email: input,
        isSelected: input.length > 0 ? true : false,
      };
    });

    this.signatoriesList.set(updatedList);
  }

  updateSignatorySelection(signatory: EntitySignatoriesList) {
    const updatedList = this.signatoriesList().map((sign) => {
      if (sign?.ausId !== signatory?.ausId || sign?.dirId !== signatory?.dirId) {
        return sign;
      }
      return {
        ...sign,
        isSelected: sign.isSelected ? false : true,
      };
    });

    this.signatoriesList.set(updatedList);
  }

  fetchEntityESignStatus() {
    this.rekycESignService.entityESignStatus(this.entityId() as string).subscribe({
      next: (result) => {
        const { response } = result;

        if (!response) return;

        const { status, data } = response;

        if (status === ApiStatus.SUCCESS) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { entityESignStatus, signers } = data as any;
          this.entityESignStatus.set(entityESignStatus);
          this.signatoryStatusList.set(signers);

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          signers.map((sign: any) => {
            if (sign.redirectUrl) {
              this.redirectUrl = sign.redirectUrl;
            }
          });

          if (entityESignStatus === 'not-initiated') {
            this.fetchEntityESignParticipants();
          }
        }
      },
    });
  }

  fetchEntityESignParticipants() {
    this.rekycESignService.entityESignParticipants(this.entityId() as string).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isFetching.set(loading);

        if (!response) return;

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          const { data } = response;
          this.signatoriesList.set(data as EntityESignSignatoryList[]);
        }
      },
    });
  }

  continueESign() {
    window.open(this.redirectUrl(), '_blank');
  }

  proceedToESign(type: 'aadhaar' | 'dsc') {
    if (this.showESignTypeModal()) {
      this.handleESignTypeModal();
    }

    const entityESignSignatoryList: EntityESignSignatoryList[] = this.selectedSignatories().map(
      (sign) => {
        return {
          id: (sign?.ausId || sign?.dirId) as string,
          name: sign.name as string,
          emailId: sign?.email as string,
        };
      },
    );

    const entityId = this.entityInfo()?.entityId;

    const payload: ProceedEntityESign = {
      type: type,
      entityId: entityId as string,
      esignDetails: entityESignSignatoryList,
    };

    this.rekycESignService.proceedToESign(payload).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isProceedingToESign.set(loading);

        if (loading || !response) {
          return;
        }

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { message } = response as any;
          this.toast.success(message);
          this.handleProceedESignSheet();
          this.fetchEntityESignStatus();
        } else {
          const { message } = response;
          this.toast.error(message);
        }
      },
    });
  }

  onSubmit() {
    const prevHadErrors = this.signatoriesList().some((sign) => !!sign.errorMsg);
    let hasError = false;

    const emailCounts = new Map();

    for (const item of this.signatoriesList()) {
      if (item.email) {
        emailCounts.set(item.email, (emailCounts.get(item.email) || 0) + 1);
      }
    }

    this.signatoriesList().map((sign) => {
      if (emailCounts.get(sign?.email) > 1) {
        sign.errorMsg = 'Email should be unique';
        hasError = true;
      } else if (sign.isSelected) {
        if (!sign.email) {
          hasError = true;
          sign.errorMsg = 'E-Mail ID is required';
        } else if (!this.validatorsService.isValidEmail(sign.email)) {
          hasError = true;
          sign.errorMsg = 'Invalid E-Mail ID';
        } else {
          sign.errorMsg = '';
        }
      } else {
        sign.errorMsg = '';
      }
    });

    const selectedSignatories = this.signatoriesList().filter((sign) => sign?.isSelected);

    if (selectedSignatories.length < 2) {
      this.toast.error('Select atleast two signatories');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    this.selectedSignatories.set(selectedSignatories);

    if (prevHadErrors) {
      // Add a short delay to let error messages clear before opening the modal
      setTimeout(() => {
        this.handleESignTypeModal();
      }, 200);
    } else {
      // Open the modal immediately if there were no previous errors
      this.handleESignTypeModal();
    }
  }
}
