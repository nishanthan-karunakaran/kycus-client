import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

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
    return this.boDetails.controls.every((group) => group.valid);
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
    this.updateAddBtnClicked.emit(true);
  }

  removeLastBoDetail() {
    if (this.boDetails.length > 0) {
      this.boDetails.removeAt(this.boDetails.length - 1);
    }
  }

  submit(action: 'save' | 'submit') {
    // eslint-disable-next-line no-console
    console.log(action, this.form.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }
}
