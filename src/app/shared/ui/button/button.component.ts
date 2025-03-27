import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'ui-button',
  template: `
    <button
      class="flex items-center justify-center gap-2"
      [ngClass]="btnClass"
      [attr.tabindex]="tabindex"
      [attr.aria-label]="ariaLabel"
      [attr.aria-disabled]="disabled"
      [attr.role]="role"
      [attr.aria-pressed]="ariaPressed"
      [disabled]="disabled"
      [type]="type"
      (click)="btnClick.emit($event)"
    >
      <span *ngIf="label">{{ label }}</span>
      <lucide-icon
        [name]="icon"
        [size]="iconSize"
        aria-hidden="true"
      ></lucide-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnChanges {
  @Input() label!: string;
  @Input() icon?: string;
  @Input() iconSize = 20;
  @Input() iconPos: 'left' | 'right' = 'left';
  @Input() class = '';
  @Input() tabindex = 0;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel?: string;
  @Input() role = 'button';
  @Input() ariaPressed?: boolean;

  @Output() btnClick = new EventEmitter<Event>();

  btnClass = {};

  ngOnChanges() {
    this.btnClass = {
      'flex-row-reverse': this.iconPos === 'left',
      [this.class]: !!this.class,
    };
  }
}
