import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filemodal',
  templateUrl: './filemodal.component.html',
})
export class FilemodalComponent {
  @Input() isModalOpen = false;
  @Output() closeModal = new EventEmitter<boolean>();

  handleModal() {
    this.closeModal.emit(false);
  }
}
