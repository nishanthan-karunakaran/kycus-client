import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { FormStatus } from './store/rekyc-form.reducer';
import { selectRekycFormStatus } from './store/rekyc-form.selectors';
import { FormStep } from './rekyc-form.model';

@Injectable({
  providedIn: 'root',
})
export class RekycFormService {
  readonly formStatus = toSignal(this.store.select(selectRekycFormStatus));
  private readonly stepOrder: Array<keyof FormStatus['forms']> = [
    'entityDetails',
    'ausDetails',
    'rekycForm',
    'eSign',
  ];

  constructor(private store: Store) {}

  getRekycLS(key: string) {
    const obj = localStorage.getItem('rekyc');
    const currentRekyc: Record<string, string> = obj ? JSON.parse(obj) : {};
    return currentRekyc[key] || null;
  }

  updateRekycLS(key: string, value: string) {
    const obj = localStorage.getItem('rekyc');
    const currentRekyc = obj ? JSON.parse(obj) : {};
    currentRekyc[key] = value;
    localStorage.setItem('rekyc', JSON.stringify(currentRekyc));
  }

  private readonly stepFormKeyMap: Record<FormStep, keyof FormStatus['forms']> = {
    [FormStep.ENTITY_DETAILS]: 'entityDetails',
    [FormStep.PERSONAL_DETAILS]: 'ausDetails',
    [FormStep.KYC_FORM]: 'rekycForm',
    [FormStep.E_SIGN]: 'eSign',
  };

  canAccessStep(step: FormStep): boolean {
    const status = this.formStatus();
    if (!status) return false;

    const targetFormKey = this.stepFormKeyMap[step];
    const targetIndex = this.stepOrder.indexOf(targetFormKey);
    if (targetIndex === -1) return false;

    for (let i = 0; i < targetIndex; i++) {
      if (!status[this.stepOrder[i]]) {
        return false;
      }
    }

    return true;
  }
}
