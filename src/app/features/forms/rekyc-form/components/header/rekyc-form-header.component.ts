import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AusInfo } from '@features/forms/rekyc-form/rekyc-form.model';

@Component({
  selector: 'rekyc-form-header',
  templateUrl: './rekyc-form-header.component.html',
  styleUrls: ['./rekyc-form-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycFormHeaderComponent {
  @Input() ausInfo: AusInfo | null = null;

  get getAusType() {
    switch (this.ausInfo?.ausType) {
      case 'aus':
        return 'Authorized Signatory';
      case 'others':
        return 'Others';
      default:
        return '';
    }
  }
}
