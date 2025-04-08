import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'ui-select',
  template: `
    <select
      class="w-full rounded border bg-white p-2"
      (change)="onSelectChange($event)"
      [disabled]="disabled"
      [value]="selectedValue"
    >
      <!-- Loop through options array -->
      <option *ngFor="let option of options" [value]="option.value">
        {{ option.label }}
      </option>
    </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = '';
  @Input() disabled = false;
  @Input() defaultValue: any = null;

  @Output() valueChange = new EventEmitter<any>();

  selectedValue: any = null;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngOnInit(): void {
    // If a placeholder is provided, prepend it to the options list
    if (this.placeholder) {
      this.options = [
        { label: this.placeholder, value: null }, // Placeholder option
        ...this.options, // Rest of the options
      ];
    }

    // Set the default value if provided
    if (this.defaultValue !== null) {
      this.selectedValue = this.defaultValue;
      this.writeValue(this.defaultValue);
    }
  }

  // Handle value change from <select>
  onSelectChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedValue = value;
    this.onChange(value);
    this.onTouched(); // Notify that the control was touched
    this.valueChange.emit(value);
  }

  // ControlValueAccessor Methods
  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn; // Called when the value changes in the form control
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn; // Called when the element is touched in the form control
  }
}
