import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/core/services/helpers.service';
import { ValidatorsService } from 'src/app/core/services/validators.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  isLoading = false;
  submitted = false;
  fb = inject(FormBuilder);
  validatorService = inject(ValidatorsService);
  helperService = inject(HelperService);
  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, this.validatorService.emailValidator()]],
    designation: ['', [Validators.required]],
    aadhaar: ['', [Validators.required, this.validatorService.aadhaarValidator()]],
    pan: ['', [Validators.required, this.validatorService.panValidator()]],
    mobileNo: ['', [Validators.required, this.validatorService.mobileNumberValidator()]],
  });

  getRequiredMessage(field: string): string {
    const capsErrorFields = ["aadhaar", "pan", "otp"];

    if (capsErrorFields.includes(field)) {
      return `${(field).toUpperCase()} is required`;
    }

    if (field === "mobileNo") {
      return "Mobile Number is required";
    }
    return `${this.helperService.toTitleCase(field)} is required`;
  }

  getFormError(field: string): string | null {
    if (!this.submitted) return null;

    const control = this.signupForm.get(field);
    if (!control) return null;

    switch (true) {
      case control.hasError('required'):
        return this.getRequiredMessage(field);

      case control.hasError('email'):
        return 'Invalid email format';

      case control.hasError('minlength'):
        return `${this.helperService.toTitleCase(field)} must be at least ${control.errors?.['minlength']?.requiredLength} characters`;

      case control.hasError('validationError'):
        return control.errors?.['validationError'];

      default:
        return null;
    }
  }


  submitForm() {
    this.submitted = true;

    // this.signupForm.get('mobileNo')?.setErrors({ 'validationError': 'Vanakkam' });
  }

}
