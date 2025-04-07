import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-filename',
  templateUrl: './filename.component.html',
})
export class FilenameComponent {
  @Input() fileName = '';
  @Input() fileLink: null | string = null;
  @Input() canRemove = true;

  openFileInNewTab(): void {
    if (this.fileLink) {
      window.open(this.fileLink, '_blank');
    }
  }
}
