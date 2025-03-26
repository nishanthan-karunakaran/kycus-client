import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
})
export class SheetComponent {
  @Input() isOpen = false;
  @Input() position: 'left' | 'right' = 'right'; // Position of the sheet

  close() {
    this.isOpen = false; // Close the sheet when triggered
  }
}
