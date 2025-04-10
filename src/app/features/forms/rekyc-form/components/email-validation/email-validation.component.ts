import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiStatus } from 'src/app/core/constants/api.response';
import { InputFormat } from 'src/app/core/directives/input-format.directive';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';
import { EmailValidationService } from './email-validation.service';
import { interval, Subscription, takeWhile } from 'rxjs';
import { VerifyOtpResponse } from '@features/forms/rekyc-form/rekyc-form.model';

@Component({
  selector: 'rekyc-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycEmailValidationComponent implements OnInit, OnDestroy {
  @Input() token: string | null = null;
  @Output() emailVerified = new EventEmitter<VerifyOtpResponse>();

  isSubmitted = false;
  isLoading = signal(false);
  loginForm!: FormGroup;
  otpForm!: FormGroup;
  inputFormat: InputFormat = InputFormat.LOWERCASE;
  isOTPSent = signal(false);
  isOTPValidated = signal(false);
  ausId = '';
  resendOTPTimer = signal(0);

  private intervalSubscription: Subscription | null = null;
  private readonly initialTime = 30;

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidationService: EmailValidationService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, this.validatorsService.emailValidator()]],
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnDestroy(): void {
    this.stopResendTimer();
  }

  startResendTimer(): void {
    this.resendOTPTimer.set(this.initialTime);

    this.intervalSubscription = interval(1000)
      .pipe(takeWhile(() => this.resendOTPTimer() > 0))
      .subscribe(() => {
        this.resendOTPTimer.update((time) => time - 1);
      });
  }

  stopResendTimer(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
    this.resendOTPTimer.set(0);
  }

  changeEmail(): void {
    this.isOTPSent.set(false);
    this.stopResendTimer();
  }

  verifyOTP(): void {
    const payload = {
      ausId: this.ausId,
      otp: this.otpForm.value.otp,
    };

    this.emailValidationService.verifyOTP(payload).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isLoading.set(loading);

        if (!response) return;

        const { status, message } = response;

        if (status === ApiStatus.SUCCESS) {
          const data: VerifyOtpResponse = {
            ausId: this.ausId,
            ausName: 'Puneet Rajkumar',
            ausType: 'aus',
            filledBy: null,
          };
          this.toast.success('Email Verified!');
          this.isOTPSent.set(true);
          this.emailVerified.emit(data);
        } else {
          this.toast.error(message as string);
        }
      },
    });
  }

  requestOTP(): void {
    if (this.token && this.resendOTPTimer() <= 0) {
      const payload = {
        token: this.token,
        email: this.loginForm.value.email,
      };

      this.emailValidationService.requestOTP(payload).subscribe({
        next: (result) => {
          const { loading, response } = result;
          this.isLoading.set(loading);

          if (!response) return;

          const { status, message, data } = response;

          if (status === ApiStatus.SUCCESS) {
            const { ausId } = data as { ausId: string };
            this.ausId = ausId;
            this.toast.success('OTP sent to your email');
            this.isOTPSent.set(true);
            this.startResendTimer();
          } else {
            this.toast.error(message as string);
          }
        },
      });
    }
  }
}
