import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-button',
  template: `
    <button
      class="flex items-center justify-center gap-2"
      [ngClass]="class"
      [attr.tabindex]="tabindex"
      [attr.aria-label]="ariaLabel"
      [attr.aria-disabled]="disabled"
      [attr.role]="role"
      [attr.aria-pressed]="ariaPressed"
      [disabled]="disabled"
      [type]="type"
      (click)="btnClick.emit($event)"
    >
      <lucide-icon
        *ngIf="icon && iconPos === 'left'"
        [name]="icon"
        [size]="iconSize"
        aria-hidden="true"
      ></lucide-icon>
      <span *ngIf="label">{{ label }}</span>
      <lucide-icon
        *ngIf="icon && iconPos === 'right'"
        [name]="icon"
        [size]="iconSize"
        aria-hidden="true"
      ></lucide-icon>
    </button>
  `,
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() icon?: string;
  @Input() iconSize = 20;
  @Input() iconColor = '';
  @Input() iconPos: 'left' | 'right' = 'left';
  @Input() class = '';
  @Input() tabindex = 0;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel?: string;
  @Input() role = 'button';
  @Input() ariaPressed?: boolean;

  @Output() btnClick = new EventEmitter<Event>();
}
