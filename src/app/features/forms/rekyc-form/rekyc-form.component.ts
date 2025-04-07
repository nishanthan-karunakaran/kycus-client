import { Component, signal } from '@angular/core';
import { FormPage, FormStep } from './rekyc-form.model';

@Component({
  selector: 'app-rekyc-form',
  templateUrl: './rekyc-form.component.html',
  styleUrls: ['./rekyc-form.component.scss'],
})
export class RekycFormComponent {
  currentForm = signal<FormStep>(FormStep.ENTITY_DETAILS);
  formList: FormPage[] = [
    { label: 'Entity Details', step: FormStep.ENTITY_DETAILS, isCompleted: true, canShow: false },
    { label: 'Declaration', step: FormStep.DECLARATION, isCompleted: false, canShow: false },
    {
      label: 'Personal Details',
      step: FormStep.PERSONAL_DETAILS,
      isCompleted: false,
      canShow: true,
    },
    { label: 'KYC Form', step: FormStep.KYC_FORM, isCompleted: false, canShow: true },
    { label: 'E-Sign', step: FormStep.E_SIGN, isCompleted: false, canShow: true },
  ];

  trackStep(_index: number, step: FormPage): string {
    return step.step;
  }

  setCurrentForm(item: FormPage) {
    if (item.canShow) {
      this.currentForm.set(item.step);
    }
  }
}
