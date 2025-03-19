import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/core/services/helpers.service';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { AuthStep } from 'src/app/features/auth/auth.model';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading = false;
  isSubmitted = false;
  signupForm!: FormGroup;
  signupState = signal<AuthStep>({
    otpSent: false,
    otpVerified: false,
  });

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private helperService: HelperService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, this.validatorService.emailValidator()],
      ],
    });
  }

  addOTPField() {
    this.isSubmitted = false;
    this.signupForm.addControl(
      'otp',
      this.fb.control('', [Validators.required, Validators.minLength(6)]),
    );
  }

  addAllFields() {
    this.isSubmitted = false;
    this.signupForm.addControl(
      'companyName',
      this.fb.control('', Validators.required),
    );
    this.signupForm.addControl(
      'designation',
      this.fb.control('', Validators.required),
    );
    this.signupForm.addControl(
      'mobileNo',
      this.fb.control('', [
        Validators.required,
        this.validatorService.mobileNumberValidator(),
      ]),
    );
  }

  getRequiredMessage(field: string): string {
    const capsErrorFields = ['aadhaar', 'pan', 'otp', 'companyName'];

    if (capsErrorFields.includes(field)) {
      return `${field.toUpperCase()} is required`;
    }

    if (field === 'mobileNo') {
      return 'Mobile Number is required';
    }
    return `${this.helperService.toTitleCase(field)} is required`;
  }

  getFormError(field: string): string | null {
    if (!this.isSubmitted) return null;

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

  handleLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  sendEmailOTP() {
    this.signupState.mutate((state) => (state.otpSent = true));
    this.addOTPField();
    this.handleLoading();
    this.toast.success('OTP sent successfully!');
  }

  verifyEmailOTP() {
    this.signupState.mutate((state) => (state.otpVerified = true));
    this.addAllFields();
    this.handleLoading();
    this.toast.success('Email verified successfully!');
  }

  signup() {
    this.handleLoading();
    this.toast.success('Account created successfully!');
  }

  submitForm() {
    this.isSubmitted = true;

    if (this.signupForm.invalid) return;

    if (!this.signupState().otpSent) {
      this.sendEmailOTP();
    } else if (!this.signupState().otpVerified) {
      this.verifyEmailOTP();
    } else {
      this.signup();
    }

    console.log(this.signupForm.value);

    // this.signupForm.get('mobileNo')?.setErrors({ 'validationError': 'Vanakkam' });
  }
}
