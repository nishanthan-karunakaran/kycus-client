import { Component, Input, ElementRef, AfterContentInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterContentInit {
  @Input() isOpen = false;
  @Input() class = '';
  @Input() showClose = true;
  @Input() closeOnOutsideClick = true;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close = new EventEmitter<void>();

  hasHeader = false;
  hasFooter = false;
  hasContent = false;

  constructor(private el: ElementRef) {}

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }

  onOverlayClick(event: Event) {
    if (this.closeOnOutsideClick && event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  ngAfterContentInit() {
    this.hasHeader = !!this.el.nativeElement.querySelector('[modalHeader]');
    this.hasFooter = !!this.el.nativeElement.querySelector('[modalFooter]');
    this.hasContent = !!this.el.nativeElement.querySelector('[modalContent]');
  }
}
