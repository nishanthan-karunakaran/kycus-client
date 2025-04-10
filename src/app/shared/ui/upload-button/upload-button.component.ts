import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'ui-upload-button',
  template: `
    <button
      type="button"
      class="flex items-center gap-1 border-2 border-dashed border-secondaryBlue bg-transparent px-3 py-2 text-xs focus:ring-0"
      [ngClass]="btnClass"
      (click)="fileInput.click()"
      [disabled]="disabled"
    >
      <lucide-icon name="cloud-upload" color="#4076C9" size="16" />
      <span class="text-secondaryBlue">{{ label }}</span>
    </button>
    <input #fileInput type="file" hidden (change)="handleChange($event)" [accept]="accept" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadButtonComponent implements OnChanges {
  @Input() label = 'Upload';
  @Input() accept = '.xlsx';
  @Input() class = '';
  @Input() ngClass = {};
  @Input() disabled = false;
  @Input() loading = false;
  @Output() selectedFile = new EventEmitter<File>();

  btnClass = {};

  ngOnChanges() {
    this.btnClass = {
      // loading: this.loading,
      [this.class]: !!this.class,
      ...this.ngClass,
    };
  }

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.selectedFile.emit(input.files[0]);
    }
  }
}
