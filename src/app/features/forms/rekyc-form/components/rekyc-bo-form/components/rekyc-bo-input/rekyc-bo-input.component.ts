import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiStatus } from '@core/constants/api.response';
import { RekycBoService } from '@features/forms/rekyc-form/components/rekyc-bo-form/rekyc-bo.service';
import { selectAusInfo } from '@features/forms/rekyc-form/components/rekyc-personal-details/store/personal-details.selectors';
import { BoDetail, SaveBODetails } from '@features/forms/rekyc-form/rekyc-form.model';
import { RekycFormService } from '@features/forms/rekyc-form/rekyc-form.service';
import { updateRekycStepStatus } from '@features/forms/rekyc-form/store/rekyc-form.action';
import { selectRekycStepStatus } from '@features/forms/rekyc-form/store/rekyc-form.selectors';
import { Store } from '@ngrx/store';
import { ToastService } from '@src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'rekyc-bo-input',
  templateUrl: './rekyc-bo-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycBoInputComponent implements OnInit {
  form = this.fb.group({
    boDetails: this.fb.array([]),
  });
  isLoading = signal(false);
  readonly ausInfo = toSignal(this.store.select(selectAusInfo));
  readonly formStepStatus = toSignal(this.store.select(selectRekycStepStatus));
  isFormSubmitted = signal(false);

  constructor(
    private fb: FormBuilder,
    private boService: RekycBoService,
    private rekycFormService: RekycFormService,
    private toast: ToastService,
    private store: Store,
  ) {}

  ngOnInit() {
    // Add two initial BO entries
    this.addBoDetail();
    this.addBoDetail();
  }

  trackBO(index: number) {
    return index;
  }

  get boDetails(): FormArray {
    return this.form.get('boDetails') as FormArray;
  }

  get isFormValid(): boolean {
    const formArray = this.form.get('boDetails') as FormArray;
    return (
      formArray && formArray.length > 0 && formArray.controls.every((control) => control.valid)
    );
  }

  createBoDetail(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  }

  updateBoDetail(index: number, field: string, value: string | number | boolean): void {
    const control = this.boDetails.at(index);
    if (control) {
      control.get(field)?.setValue(value, { emitEvent: false });
    }
  }

  addBoDetail() {
    this.boDetails.push(this.createBoDetail());
  }

  removeLastBoDetail() {
    if (this.boDetails.length > 0) {
      this.boDetails.removeAt(this.boDetails.length - 1);
    }
  }

  submit(action: 'save' | 'submit') {
    if (!this.isFormValid) {
      this.isFormSubmitted.set(true);
      return;
    }

    if (action === 'submit') {
      const boList = this.form.value.boDetails as BoDetail[];

      const payload: SaveBODetails = {
        ausId: this.ausInfo()?.ausId as string,
        boList,
      };
      this.boService.saveBODetails(payload).subscribe({
        next: (result) => {
          const { loading, response } = result;
          this.isLoading.set(loading);

          if (!response) return;

          const { status } = response;

          if (status === ApiStatus.SUCCESS) {
            this.toast.success('Beneficairy Owners saved!');
            this.store.dispatch(updateRekycStepStatus({ boDetails: true }));
            this.rekycFormService.updatRekycFormStep('bo');
          } else {
            this.toast.error(response.message || 'Something went wrong!');
          }
        },
      });
    }
  }
}
