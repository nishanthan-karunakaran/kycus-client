import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnChanges, ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() autofocus: boolean = false;
  @Input() required: boolean = false;
  @Input() maxlength?: number;
  @Input() max?: number;
  @Input() min?: number;
  @Input() pattern?: string | null = null;
  @Input() autocomplete?: 'on' | 'off' | null = null;
  @Input() errorMessage: string | null = null;
  @Input() icon: string | null = null;

  value: string | number | boolean = '';
  @ViewChild('inputElement') inputRef!: ElementRef<HTMLInputElement>;

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const change = changes[propName];
        // console.log(`Input property '${propName}' changed:`, change);

        // Handle autofocus and set focus if true
        if (propName === 'autofocus' && change.currentValue) {
          this.focusInput();
        }

        // Handle disabled state dynamically
        if (propName === 'disabled') {
          this.setDisabledState(change.currentValue);
        }

        // Handle readonly state dynamically
        if (propName === 'readonly') {
          this.setReadonlyState(change.currentValue);
        }

        // Update other properties if necessary
        if (this.inputRef) {
          if (propName === 'maxlength') {
            this.inputRef.nativeElement.maxLength = this.maxlength || -1;
          }

          if (propName === 'min') {
            this.inputRef.nativeElement.min = this.min ? String(this.min) : '';
          }

          if (propName === 'max') {
            this.inputRef.nativeElement.max = this.max ? String(this.max) : '';
          }

          if (propName === 'pattern') {
            this.inputRef.nativeElement.pattern = this.pattern || '';
          }

          if (propName === 'autocomplete') {
            this.inputRef.nativeElement.autocomplete =
              this.autocomplete || 'off';
          }
        }
      }
    }

    // Trigger change detection to ensure input reflects changes immediately
    this.cdr.detectChanges();
  }

  focusInput(): void {
    setTimeout(() => this.inputRef?.nativeElement?.focus(), 0);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.inputRef) {
      this.inputRef.nativeElement.disabled = isDisabled;
    }
  }

  setReadonlyState(isReadonly: boolean): void {
    this.readonly = isReadonly;
    if (this.inputRef) {
      this.inputRef.nativeElement.readOnly = isReadonly;
    }
  }

  writeValue(value: string | number | boolean): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (this.type === 'number') {
      let cleanedValue = target.value.replace(/[^0-9.-]/g, ''); // Remove non-numeric characters

      if (cleanedValue !== '' && !isNaN(Number(cleanedValue))) {
        let numericValue = Number(cleanedValue);

        // Ensure min/max constraints only if defined
        if (this.min !== undefined && numericValue < this.min) {
          numericValue = this.min;
        }
        if (this.max !== undefined && numericValue > this.max) {
          numericValue = this.max;
        }

        this.value = numericValue;
        target.value = String(numericValue);
      } else {
        this.value = '';
        target.value = '';
      }
    } else {
      let inputValue = target.value;

      if (this.maxlength !== undefined && inputValue.length > this.maxlength) {
        inputValue = inputValue.slice(0, this.maxlength);
      }

      if (this.pattern) {
        const regex = new RegExp(this.pattern);
        if (!regex.test(inputValue)) {
          inputValue = this.value as string; // Revert to last valid value
        }
      }

      this.value = inputValue;
      target.value = inputValue;
    }

    this.onChange(this.value);
    this.onTouched();
  }
}
