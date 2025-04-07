import { ChangeDetectionStrategy, Component, DoCheck, signal } from '@angular/core';
import { FormPage, FormStep } from './rekyc-form.model';

@Component({
  selector: 'app-rekyc-form',
  templateUrl: './rekyc-form.component.html',
  styleUrls: ['./rekyc-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycFormComponent implements DoCheck {
  currentForm = signal<FormStep>(FormStep.ENTITY_DETAILS);
  formList: FormPage[] = [
    { label: 'Entity Details', step: FormStep.ENTITY_DETAILS, isCompleted: false, canShow: true },
    { label: 'Declaration', step: FormStep.DECLARATION, isCompleted: false, canShow: true },
    {
      label: 'Personal Details',
      step: FormStep.PERSONAL_DETAILS,
      isCompleted: false,
      canShow: true,
    },
    { label: 'KYC Form', step: FormStep.KYC_FORM, isCompleted: false, canShow: true },
    { label: 'E-Sign', step: FormStep.E_SIGN, isCompleted: false, canShow: true },
  ];
  readonly FormStep = FormStep;

  ngDoCheck(): void {
    // eslint-disable-next-line no-console
    console.log('rekyc global form rendeing');
  }

  trackStep(_index: number, step: FormPage): string {
    return step.step;
  }

  setCurrentForm(item: FormPage) {
    if (item.canShow) {
      this.currentForm.set(item.step);
    }
  }
}
