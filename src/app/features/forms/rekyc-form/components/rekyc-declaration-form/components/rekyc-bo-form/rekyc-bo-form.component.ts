import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RekycBoService } from './rekyc-bo.service';
import { BoDetail, SaveBODetails } from '@features/forms/rekyc-form/rekyc-form.model';
import { ToastService } from '@src/app/shared/ui/toast/toast.service';
import { ApiStatus } from '@core/constants/api.response';

@Component({
  selector: 'rekyc-bo-form',
  templateUrl: './rekyc-bo-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycBoFormComponent implements OnInit {
  private _addBO = false;

  @Input()
  set addBO(value: boolean) {
    if (value && !this._addBO) {
      this.addBoDetail();
    }
    this._addBO = value;
  }
  @Output() updateAddBtnClicked = new EventEmitter<boolean>();

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
      name: ['q', Validators.required],
      addressLine: ['q', Validators.required],
      city: ['q', Validators.required],
      state: ['q', Validators.required],
      country: ['q', Validators.required],
      pincode: ['1', [Validators.required, Validators.pattern(/^\d{6}$/)]],
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
    this.updateAddBtnClicked.emit(true);
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
