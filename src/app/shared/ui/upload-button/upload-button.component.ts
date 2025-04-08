import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-upload-button',
  template: `
    <button
      type="button"
      class="flex items-center gap-1 border-2 border-dashed border-secondaryBlue bg-transparent px-3 py-2 text-xs focus:ring-0"
      (click)="fileInput.click()"
    >
      <lucide-icon name="cloud-upload" color="#4076C9" size="16" />
      <span class="text-secondaryBlue">Upload</span>
    </button>
    <input #fileInput type="file" hidden (change)="handleChange($event)" [accept]="accept" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadButtonComponent {
  @Input() accept = '.xlsx';
  @Output() selectedFile = new EventEmitter<File>();

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.selectedFile.emit(input.files[0]);
    }
  }
}
