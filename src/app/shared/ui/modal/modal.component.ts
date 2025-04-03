import {
  Component,
  Input,
  ElementRef,
  AfterContentInit,
  Output,
  EventEmitter,
  Renderer2,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements AfterContentInit, OnChanges {
  @Input() isOpen = false;
  @Input() class = '';
  @Input() contentClass = '';
  @Input() showClose = true;
  @Input() dismissOnOutsideClick = false;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close = new EventEmitter<void>();

  hasHeader = false;
  hasFooter = false;
  hasContent = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  closeModal() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.unlockBackground();
    this.close.emit();
  }

  onOverlayClick(event: Event) {
    if (event.target === event.currentTarget && this.dismissOnOutsideClick) {
      this.closeModal();
    }
  }

  onKeydown(event: KeyboardEvent) {
    // eslint-disable-next-line no-console
    console.log(event);
    if (this.dismissOnOutsideClick && event.key === 'Escape') {
      this.closeModal();
    }
  }

  lockBackground() {
    this.renderer.addClass(document.documentElement, 'modal-open');
    this.renderer.setStyle(document.body, 'pointer-events', 'none'); // Block clicks
  }

  unlockBackground() {
    this.renderer.removeClass(document.documentElement, 'modal-open');
    this.renderer.removeStyle(document.body, 'pointer-events'); // Restore clicks
  }

  ngAfterContentInit() {
    this.hasHeader = !!this.el.nativeElement.querySelector('[modalHeader]');
    this.hasFooter = !!this.el.nativeElement.querySelector('[modalFooter]');
    this.hasContent = !!this.el.nativeElement.querySelector('[modalContent]');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']?.currentValue !== changes['isOpen']?.previousValue) {
      if (this.isOpen) {
        this.lockBackground();
      } else {
        this.unlockBackground();
      }
    }
  }
}
