import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

export interface UiMenuOption {
  label: string;
  icon?: string;
  iconPos?: 'left' | 'right';
  iconColor?: string;
  iconSize?: string;
  href?: string;
  route?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  disabled?: boolean;
  action?: () => void;
  children?: UiMenuOption[];
}

@Component({
  selector: 'ui-menu',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="relative inline-block">
      <div
        class="cursor-pointer focus:outline-none"
        (click)="toggleMenu()"
        tabindex="0"
        (keydown.enter)="toggleMenu()"
        (keydown.space)="toggleMenu()"
      >
        <ng-content></ng-content>
      </div>

      <div
        *ngIf="isOpen"
        #menu
        [ngClass]="alignRight ? 'right-0' : 'left-0'"
        class="absolute z-50 mt-2 w-max max-w-60 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        role="menu"
        aria-orientation="vertical"
        tabindex="-1"
      >
        <div
          *ngFor="let option of options; trackBy: trackByOption"
          class="flex items-center gap-2 p-2 first:rounded-t-md last:rounded-b-md hover:bg-gray-100"
          role="menuitem"
        >
          <lucide-icon *ngIf="option?.icon" [name]="option.icon" [size]="option?.iconSize || 16" />
          <a
            (click)="handleOptionClick(option)"
            (keydown.enter)="handleOptionClick(option)"
            (keydown.space)="handleOptionClick(option)"
            class="block w-full cursor-pointer text-left text-gray-700 no-underline"
            role="menuitem"
            tabindex="0"
          >
            {{ option.label }}
          </a>
        </div>
      </div>
    </div>
  `,
})
export class MenuComponent {
  @Input() options: UiMenuOption[] = [];
  @Output() optionClicked = new EventEmitter<UiMenuOption>();
  isOpen = false;
  alignRight = false;

  @ViewChild('menu') menuRef!: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.zone.onStable.pipe().subscribe(() => {
        // This will run after the view is fully rendered
        this.adjustAlignment();
      });
    }
  }

  handleOptionClick(option: UiMenuOption) {
    if (option.action) {
      option.action();
    }
    this.optionClicked.emit(option);
    this.isOpen = false;
  }

  trackByOption(index: number, option: UiMenuOption): string {
    return option.label;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(targetElement) && this.isOpen) {
      this.isOpen = false;
    }
  }

  private adjustAlignment() {
    const menuEl = this.menuRef?.nativeElement;
    const triggerRect = this.elementRef.nativeElement.getBoundingClientRect();

    if (!menuEl) return;

    const menuWidth = menuEl.offsetWidth;
    const spaceRight = window.innerWidth - triggerRect.left;
    const padding = 8;

    this.alignRight = spaceRight < menuWidth + padding;

    // Trigger change detection for ngClass to update
    this.cdr.detectChanges();
  }
}
