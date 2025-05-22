import {
  Component,
  computed,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiStatus } from '@core/constants/api.response';
import { HelperService } from '@core/services/helpers.service';
import { selectEntityInfo } from '@features/forms/rekyc-form/components/entity-filledby/store/entity-info.selectors';
import {
  AusESignPreviewData,
  RekycPersonalFormService,
} from '@features/forms/rekyc-form/components/rekyc-personal-details/rekyc-personal.service';
import { selectAusInfo } from '@features/forms/rekyc-form/components/rekyc-personal-details/store/personal-details.selectors';
import { RekycFormService } from '@features/forms/rekyc-form/rekyc-form.service';
import { updateRekycFormStatus } from '@features/forms/rekyc-form/store/rekyc-form.action';
import { Store } from '@ngrx/store';
import { ToastService } from '@src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'rekyc-esign-personaldet',
  templateUrl: './esign-personaldet.component.html',
})
export class EsignPersonaldetComponent implements OnInit, OnChanges {
  @Input() openSheet = false;
  @Output() closeSheet = new EventEmitter(false);
  form!: FormGroup;
  showPopup = signal(false);
  isFormSubmitted = signal(false);
  isFormFinallySubmitted = signal(false);
  isFormSubmitting = signal(false);
  canProceedToESign = signal(false);
  entityInfo = toSignal(this.store.select(selectEntityInfo));
  ausInfo = toSignal(this.store.select(selectAusInfo));
  isLoading = signal(false);
  data = signal<AusESignPreviewData>({} as AusESignPreviewData);
  esignStatus = computed(() => this.data().esignStatus);
  esignRedirectUrl = signal('');
  // disableEdit = signal(this.esignStatus() !== 'Not Initiated' || this.esignRedirectUrl());
  showSaveConfirmModal = signal(false);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private personalFormService: RekycPersonalFormService,
    private rekycFormService: RekycFormService,
    private helperService: HelperService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      // proofOfIdentity: [{ fileName: '', url: '' }, [Validators.required]],
      // proofOfAddress: [{ fileName: '', url: '' }, [Validators.required]],
      line1: ['', [Validators.required]],
      line2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      pinCode: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      photographUrl: ['', [Validators.required]],
      signatureUrl: ['', [Validators.required]],
    });
  }

  ngOnChanges() {
    if (this.openSheet) {
      this.getESignPreviewDetails();
    }
    this.isFormSubmitted.set(false);
    this.isFormFinallySubmitted.set(false);
    this.isFormSubmitting.set(false);
    this.canProceedToESign.set(false);
  }

  disableEdit() {
    return this.esignStatus() !== 'Not Initiated' || this.esignRedirectUrl();
  }

  get showProceedESign() {
    return this.isFormFinallySubmitted() && !this.esignRedirectUrl();
  }

  get showContinueESign() {
    return (
      this.esignRedirectUrl() &&
      (this.esignStatus() === 'Initiated' ||
        this.esignStatus() === 'Awaiting Signing' ||
        this.esignStatus() === 'Pending')
    );
  }

  get showESignCompletedStatus() {
    return this.esignRedirectUrl() && this.esignStatus() === 'Signed';
  }

  handleSheet() {
    this.closeSheet.emit(true);
  }

  handleSaveConfimModal() {
    this.showSaveConfirmModal.set(!this.showSaveConfirmModal());
  }

  handlePopup() {
    this.showPopup.set(!this.showPopup());
  }

  updateFormGroup() {
    const formData = this.data();

    if (!formData) return;

    this.form.patchValue({
      name: formData.name,
      fatherName: formData.fatherName,
      // proofOfIdentity: formData.proofOfIdentity,
      // proofOfAddress: formData.proofOfAddress,
      line1: formData.line1,
      line2: formData.line2,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      pinCode: formData.pinCode,
      photographUrl: formData.photographUrl,
      signatureUrl: formData.signatureUrl,
    });
  }

  updateValue(key: string, value: string | number | boolean) {
    if (!this.disableEdit()) {
      const control = this.form.get(key);
      if (control) {
        control.setValue(value);

        if (this.isFormFinallySubmitted()) {
          this.isFormSubmitted.set(false);
        }

        if (this.isFormFinallySubmitted()) {
          this.isFormFinallySubmitted.set(false);
        }
      }
    }
  }

  getErrorMessage(formControlName: string): string {
    if (!this.isFormSubmitted()) {
      return '';
    }

    const formattedControlName = this.helperService.toTitleCase(formControlName);
    const controlName = formattedControlName.includes('Address')
      ? formattedControlName.slice(0, -1) + ' ' + formattedControlName.slice(-1)
      : formattedControlName;

    const control = this.form.get(formControlName);
    if (control && control.errors) {
      // Loop through the errors object to handle all error cases
      for (const errorKey in control.errors) {
        if (Object.prototype.hasOwnProperty.call(control.errors, errorKey)) {
          const errorValue = control.errors[errorKey];

          // Handle the specific error types
          switch (errorKey) {
            case 'required':
              return `${controlName} is required`;
            case 'minlength':
              return `${controlName} must be at least ${errorValue.requiredLength} characters`;
            case 'maxlength':
              return `${controlName} must be at most ${errorValue.requiredLength} characters`;
            case 'pattern':
              return `${controlName} has an invalid format`;
            default:
              return `${controlName} is invalid`; // Default case for unknown errors
          }
        }
      }
    }
    return ''; // Return an empty string if no errors
  }

  getESignPreviewDetails() {
    const entityId = this.entityInfo()?.entityId as string;
    const ausId = this.ausInfo()?.ausId as string;

    this.personalFormService.esignAusPreview(entityId, ausId).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isLoading.set(loading);

        if (!response) return;

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data } = response as any;
          this.data.set(data);
          this.esignRedirectUrl.set(data?.redirectUrl);
          if (data?.esignStatus === 'Signed') {
            this.store.dispatch(updateRekycFormStatus({ ausDetails: true }));
          }
          this.updateFormGroup();
        }
      },
    });
  }

  continueESign() {
    window.open(this.esignRedirectUrl(), '_blank');
  }

  proceedToESign(type: 'aadhaar' | 'dsc') {
    this.handleSaveConfimModal();

    const payload = {
      type,
      ausId: this.ausInfo()?.ausId as string,
      entityId: this.entityInfo()?.entityId as string,
    };

    this.personalFormService.proceedToESign(payload).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isFormSubmitting.set(loading);

        if (loading || !response) {
          return;
        }

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { message, data } = response as any;
          this.toast.success(message);
          this.esignRedirectUrl.set(data?.redirectUrl);
          this.data.set({ ...this.data(), esignStatus: 'Initiated' });

          const entityFilledBy = this.entityInfo()?.entityFilledBy;
          const entityFilledBySameLoggedInUser =
            entityFilledBy && entityFilledBy === this.ausInfo()?.ausId;

          if (!entityFilledBySameLoggedInUser) {
            this.handlePopup();
          }
        } else {
          const { message } = response;
          this.toast.error(message);
        }
      },
    });
  }

  onSubmit() {
    this.isFormSubmitted.set(true);

    if (this.form.invalid) {
      return;
    }

    // this.handleSaveConfimModal();

    const entityId = this.entityInfo()?.entityId;
    const ausId = this.ausInfo()?.ausId;

    if (!entityId || !ausId || !this.form.valid) {
      return;
    }

    const payload = {
      entityId,
      ausId,
      data: this.form.value,
    };

    this.personalFormService.esignAusPreviewSave(payload).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isFormSubmitting.set(loading);

        if (loading || !response) {
          return;
        }

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          this.toast.success('Your details have been updated!');
          this.isFormFinallySubmitted.set(true);
          this.canProceedToESign.set(true);
        } else {
          const { message } = response;
          this.toast.error(message);
        }
      },
    });
  }
}
