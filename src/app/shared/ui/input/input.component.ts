import { Component, forwardRef, Input } from '@angular/core';
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
export class InputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() readOnly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() errorMessage: string | null = null;
  @Input() attrs: Record<string, any> = {};

  value: string | number | boolean = '';
  onChange = (value: any) => {};
  onTouched = () => {};

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
    this.value = this.type === 'checkbox' ? target.checked : target.value;

    this.onChange(this.value); // Sync with form control
    this.onTouched();
  }
}
