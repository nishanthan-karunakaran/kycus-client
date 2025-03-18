import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ui-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit, OnChanges {
  @Input() length: number = 6;
  @Input() onlyNumeric: boolean = true;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() label: string = '';
  @Input() errorMessage: string | null = '';
  @Input() defaultValue: string = '';
  @Output() otpEntered = new EventEmitter<string>();

  @Input() inputProps: { [key: string]: any } = {};

  otpForm!: FormGroup;
  otpControls!: FormControl[]; // Store controls separately for easy access

  get otpArray(): FormArray {
    return this.otpForm.get('otpValues') as FormArray;
  }

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.initializeForm();
    if (this.defaultValue) {
      this.fillOtpInputs(this.defaultValue);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultValue'] && this.defaultValue) {
      this.fillOtpInputs(this.defaultValue);
    }
  }

  private initializeForm(): void {
    this.otpControls = Array(this.length)
      .fill(null)
      .map(() => new FormControl({ value: '', disabled: this.disabled }));

    this.otpForm = new FormGroup({
      otpValues: new FormArray(this.otpControls),
    });
  }

  private fillOtpInputs(value: string): void {
    value.split('').forEach((char, index) => {
      if (index < this.length) {
        this.otpControls[index].setValue(char);
      }
    });
    this.emitOtp();
  }

  onInputChange(index: number, event: any): void {
    const value = event.target.value;

    if (this.onlyNumeric && !/^\d$/.test(value)) {
      this.otpControls[index].setValue('');
      return;
    }

    this.otpControls[index].setValue(value);

    if (index < this.length - 1 && value) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }

    this.emitOtp();
  }

  handleBackspace(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace') {
      if (this.otpControls[index].value !== '') {
        this.otpControls[index].setValue('');
      } else if (index > 0) {
        this.otpControls[index - 1].setValue('');
        this.otpInputs.toArray()[index - 1].nativeElement.focus();
      }
      this.emitOtp();
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedValue = event.clipboardData?.getData('text') || '';
    const valueToPaste = this.onlyNumeric
      ? pastedValue.replace(/\D/g, '')
      : pastedValue;

    valueToPaste.split('').forEach((char, i) => {
      if (i < this.length) {
        this.otpControls[i].setValue(char);
      }
    });

    this.emitOtp();
  }

  private emitOtp(): void {
    const otpValue = this.otpControls.map((control) => control.value).join('');
    this.otpEntered.emit(otpValue);
  }
}
