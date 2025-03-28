import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() class = '';
  @Input() header?: string;
  @Input() showClose = true;
  @Input() footer?: TemplateRef<unknown>;
  @Input() closeOnOutsideClick = true;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close = new EventEmitter<void>();

  constructor(private renderer: Renderer2) {}

  closeModal() {
    this.isOpen = false;
    this.enablePageInteraction();
    this.close.emit();
  }

  onOverlayClick(event: Event) {
    if (this.closeOnOutsideClick && event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  disablePageInteraction() {
    this.renderer.addClass(document.body, 'modal-open');
  }

  enablePageInteraction() {
    this.renderer.removeClass(document.body, 'modal-open');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.disablePageInteraction();
      } else {
        this.enablePageInteraction();
      }
    }
  }
}
