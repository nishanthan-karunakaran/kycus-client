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
  accessibleSteps = [
    FormStep.ENTITY_DETAILS,
    FormStep.DECLARATION,
    FormStep.PERSONAL_DETAILS,
    FormStep.KYC_FORM,
    FormStep.E_SIGN,
  ];

  ngDoCheck(): void {
    // eslint-disable-next-line no-console
    console.log('rekyc global form rendeing');
  }

  trackStep(_index: number, step: FormPage) {
    return step.step;
  }

  setCurrentForm(item: FormPage) {
    if (item.canShow) {
      this.currentForm.set(item.step);
    }
  }

  onFormNavigation(direction: string) {
    const current = this.currentForm();
    const currentIndex = this.accessibleSteps.indexOf(current);

    if (currentIndex === -1) return;

    if (direction === 'next' && currentIndex < this.accessibleSteps.length - 1) {
      this.currentForm.set(this.accessibleSteps[currentIndex + 1]);
    }

    if (direction === 'prev' && currentIndex > 0) {
      this.currentForm.set(this.accessibleSteps[currentIndex - 1]);
    }
  }
}
