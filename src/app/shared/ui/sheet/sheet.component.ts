import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
})
export class SheetComponent {
  @Input() isOpen = false;
  @Input() showClose = false;
  @Input() sheetDismissOnOutside = true;
  @Input() class = '';
  @Input() headerClass = '';
  @Input() footerClass = '';
  @Input() contentClass = '';
  @Input() position: 'left' | 'right' = 'right';
  @Output() closeSheet = new EventEmitter<void>();

  close() {
    this.isOpen = false;
    this.closeSheet.emit();
  }
}
