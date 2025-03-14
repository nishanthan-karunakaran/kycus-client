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
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() header?: string;
  @Input() showClose: boolean = true;
  @Input() footer?: TemplateRef<any>;
  @Input() closeOnOutsideClick: boolean = true;

  @Output() close = new EventEmitter<void>();

  constructor(private renderer: Renderer2) {}

  closeModal() {
    this.isOpen = false;
    this.enablePageInteraction();
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent) {
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
