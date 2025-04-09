import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption<T = unknown> {
  label: string;
  value: T;
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
      <option *ngFor="let option of options; trackBy: trackOption" [value]="option.value">
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
export class SelectComponent<T = unknown> implements ControlValueAccessor, OnInit {
  @Input() options: Array<SelectOption<T>> = [];
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() defaultValue: T | null = null;

  @Output() valueChange = new EventEmitter<T>();

  selectedValue: T | null = null;

  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    if (this.placeholder) {
      this.options = [{ label: this.placeholder, value: null as unknown as T }, ...this.options];
    }

    if (this.defaultValue !== null) {
      this.selectedValue = this.defaultValue;
      this.writeValue(this.defaultValue);
    }
  }

  onSelectChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as unknown as T;
    this.selectedValue = value;
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  writeValue(value: T | null): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  trackOption(_index: number, option: SelectOption) {
    return option.value;
  }
}
