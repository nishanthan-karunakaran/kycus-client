import { selectAusInfo } from './../rekyc-personal-details/store/personal-details.selectors';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

@Component({
  selector: 'rekyc-form-header',
  templateUrl: './rekyc-form-header.component.html',
  styleUrls: ['./rekyc-form-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycFormHeaderComponent {
  readonly ausInfo = toSignal(this.store.select(selectAusInfo));

  constructor(private store: Store) {}

  get getAusType() {
    switch (this.ausInfo()?.ausType) {
      case 'aus':
      case 'others':
        return 'Others';
      default:
        return 'Authorized Signatory';
    }
  }
}
