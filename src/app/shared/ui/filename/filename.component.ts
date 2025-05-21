import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { UiCircularMaskedLoaderComponent } from '../ui-circular-masked-loader/ui-circular-masked-loader.component';

@Component({
  selector: 'ui-filename',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, UiCircularMaskedLoaderComponent],
  templateUrl: './filename.component.html',
})
export class FilenameComponent implements OnChanges {
  @Input() fileName = '';
  @Input() fileLink: string | null = null;
  @Input() loading = false;
  @Input() canRemove = true;
  @Output() removeFile = new EventEmitter<boolean>();
  fileIcon = 'file-minus';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fileName']) {
      this.handleFileIcon();
    }
  }

  handleFileIcon() {
    const fileType = this.fileName.substring(this.fileName.lastIndexOf('.') + 1);

    switch (fileType) {
      case 'pdf':
        this.fileIcon = 'file-text';
        break;
      case 'xlsx':
        this.fileIcon = 'file-spreadsheet';
        break;
      case 'jpg':
        this.fileIcon = 'file-image';
        break;
      case 'jpeg':
        this.fileIcon = 'file-image';
        break;
      case 'png':
        this.fileIcon = 'file-image';
        break;
      default:
        break;
    }
  }

  openFileInNewTab(): void {
    if (this.fileLink) {
      window.open(this.fileLink, '_blank');
    }
  }

  deleteFile(): void {
    if (this.canRemove) {
      this.removeFile.emit(true);
    }
  }
}
