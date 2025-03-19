import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiStatus } from 'src/app/core/constants/api.response';
import { HelperService } from 'src/app/core/services/helpers.service';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { AuthStep } from 'src/app/features/auth/auth.model';
import { AuthService } from 'src/app/features/auth/auth.service';
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
    private authService: AuthService,
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
    const additionalFields = {
      companyName: ['', Validators.required],
      designation: ['', Validators.required],
      mobileNo: [
        '',
        [Validators.required, this.validatorService.mobileNumberValidator()],
      ],
    };

    Object.entries(additionalFields).forEach(([key, config]) => {
      this.signupForm.addControl(
        key,
        this.fb.control(...(config as [any, any])),
      );
    });
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

  isButtonDisabled(): boolean {
    if (this.isLoading) return true; // btn to be disabled if loading

    // Get all required fields
    const requiredFields = Object.keys(this.signupForm.controls).filter((key) =>
      this.signupForm.get(key)?.hasValidator(Validators.required),
    );

    // Check if any required field is empty
    const hasEmptyRequiredFields = requiredFields.some(
      (field) => !this.signupForm.get(field)?.value,
    );

    // Check OTP length if the field exists
    const otpField = this.signupForm.get('otp');
    const isOtpInvalid = otpField ? otpField.value?.length !== 6 : false;

    return hasEmptyRequiredFields || isOtpInvalid;
  }

  sendEmailOTP() {
    this.authService
      .sendEmailOTP({ email: this.signupForm.value.email })
      .subscribe({
        next: (result) => {
          const { loading, response } = result;
          this.isLoading = loading;

          if (!response) return;

          const { status } = response;

          if (status === ApiStatus.SUCCESS) {
            this.signupState.mutate((state) => (state.otpSent = true));
            this.addOTPField();
            this.toast.success('OTP sent successfully!');
          } else {
            this.toast.error(response.message || 'Something went wrong!');
          }
        },
      });
  }

  verifyEmailOTP() {
    const payload = {
      email: this.signupForm.value.email,
      otp: this.signupForm.value.otp,
    };

    this.authService.verifyEmailOTP(payload).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isLoading = loading;

        if (!response) return;

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          this.signupState.mutate((state) => (state.otpVerified = true));
          this.addAllFields();
          this.toast.success('OTP verified successfully!');
        } else {
          this.toast.error(response.message || 'Something went wrong!');
        }
      },
    });
  }

  signup() {
    this.authService.signup(this.signupForm.value).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isLoading = loading;

        if (!response) return;

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          this.toast.success('Account created successfully!');
        } else {
          this.toast.error(response.message || 'Something went wrong!');
        }
      },
    });
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
