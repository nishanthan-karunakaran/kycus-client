import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiStatus } from '@core/constants/api.response';
import { RekycBoService } from '@features/forms/rekyc-form/components/rekyc-bo-form/rekyc-bo.service';
import { BoDetail, SaveBODetails } from '@features/forms/rekyc-form/rekyc-form.model';
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

  constructor(
    private fb: FormBuilder,
    private boService: RekycBoService,
    private toast: ToastService,
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
    if (!this.isFormValid) return;

    if (action === 'submit') {
      const boList = this.form.value.boDetails as BoDetail[];

      const payload: SaveBODetails = {
        ausId: 'ebitaus-CUS1234567-09042025-AUS3',
        boList,
      };
      this.boService.saveBODetails(payload).subscribe({
        next: (result) => {
          const { loading, response } = result;
          this.isLoading.set(loading);

          if (!response) return;

          const { status } = response;

          if (status === ApiStatus.SUCCESS) {
            this.toast.success('Beneficairy Owners details saved successfully!');
          } else {
            this.toast.error(response.message || 'Something went wrong!');
          }
        },
      });
    }
  }
}
