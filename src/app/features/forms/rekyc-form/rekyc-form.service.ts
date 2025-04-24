import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { API_URL } from '@core/constants/apiurls';
import { ApiService } from '@core/services/api.service';
import { Store } from '@ngrx/store';
import { DeleteDocument, FormStep } from './rekyc-form.model';
import { FormStatus } from './store/rekyc-form.reducer';
import { selectRekycFormStatus } from './store/rekyc-form.selectors';

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

  constructor(
    private store: Store,
    private api: ApiService,
  ) {}

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

  deleteDocument(payload: DeleteDocument) {
    return this.api.post(API_URL.APPLICATION.REKYC.DELETE_DOCUMENT, payload);
  }
}
