import { Component, Input } from '@angular/core';

interface AusESign {
  name: string;
  email: string;
  ausId?: string;
  isComplete: boolean;
}

@Component({
  selector: 'rekyc-pending-aus-status',
  templateUrl: './pending-aus-status.component.html',
})
export class RekycPendingAusStatusComponent {
  @Input() ausList: AusESign[] = [];

  trackAus(_index: number, aus: AusESign) {
    return aus.ausId;
  }
}
