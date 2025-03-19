import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ApiStatus } from 'src/app/core/constants/api.response';
import { HelperService } from 'src/app/core/services/helpers.service';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { AuthStep } from 'src/app/features/auth/auth.model';
import { AuthService } from 'src/app/features/auth/auth.service';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isSubmitted = false;
  isLoading = false;
  loginState = signal<AuthStep>({
    otpSent: false,
    otpVerified: false,
  });
  loginForm!: FormGroup;
  @ViewChild('otpInput') otpInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private validatorsService: ValidatorsService,
    private authService: AuthService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, this.validatorsService.emailValidator()],
      ],
      otp: [''],
    });
  }

  getFormError(field: string): string | null {
    const control = this.loginForm.get(field);
    if (!control || (!this.isSubmitted && !control.touched)) return null;

    if (control.hasError('required')) {
      return field !== 'otp'
        ? this.helperService.toTitleCase(field) + ' is required'
        : field.toUpperCase() + ' is required';
    }

    if (control.hasError('email')) return 'Invalid email format';

    if (control.hasError('minlength')) {
      const minLength = control.errors?.['minlength']?.requiredLength;
      return `${field} must be at least ${minLength} characters`;
    }

    return null;
  }

  private updateOTPValidators() {
    this.loginForm
      .get('otp')
      ?.setValidators([Validators.required, Validators.minLength(6)]);
    this.loginForm.get('otp')?.updateValueAndValidity();
  }

  requestLoginOTP() {
    this.authService
      .requestLoginOTP({ username: this.loginForm.value.email })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          const { loading, response } = result;
          this.isLoading = loading;

          if (!response) return;

          const { status } = response;

          if (status === ApiStatus.SUCCESS) {
            this.loginState.mutate((state) => (state.otpSent = true));
            this.toast.success('OTP sent successfully!');

            this.isSubmitted = false;
            this.updateOTPValidators();
          } else {
            this.toast.error(response.message || 'Something went wrong!');
          }
        },
      });
  }

  signin() {
    const paylaod = {
      username: this.loginForm.value.email,
      otp: this.loginForm.value.otp,
    };

    this.authService.signin(paylaod).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isLoading = loading;

        if (!response) return;

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          this.toast.success('Logged in successfully!');
        } else {
          this.toast.error(response.message || 'Something went wrong!');
        }
      },
    });
  }

  submitLoginForm() {
    this.isSubmitted = true;

    console.log(this.loginForm.value);

    if (this.loginForm.invalid) return; // Stop execution if form is invalid

    if (this.loginState().otpSent) {
      this.signin();
    } else {
      this.requestLoginOTP();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
