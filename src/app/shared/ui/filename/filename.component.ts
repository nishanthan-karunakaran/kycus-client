import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'ui-filename',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './filename.component.html',
})
export class FilenameComponent {
  @Input() fileName = '';
  @Input() fileLink: string | null = null;
  @Input() canRemove = true;
  @Output() removeFile = new EventEmitter<boolean>();

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
