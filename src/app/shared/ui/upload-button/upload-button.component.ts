import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ui-upload-button',
  template: `
    <button
      class="border-secondaryBlue flex items-center gap-1 border-2 border-dashed bg-transparent px-3 py-2 text-xs focus:ring-0"
      (click)="onClick($event)"
    >
      <lucide-icon name="cloud-upload" color="#4076C9" size="16" />
      <span class="text-secondaryBlue">Upload</span>
    </button>
  `,
})
export class UploadButtonComponent {
  @Output() btnClick = new EventEmitter<Event>();

  onClick(event: Event) {
    this.btnClick.emit(event);
  }
}
