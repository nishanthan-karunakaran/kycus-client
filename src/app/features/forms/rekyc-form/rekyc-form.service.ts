import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { API_URL } from '@core/constants/apiurls';
import { ApiService } from '@core/services/api.service';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { DeleteDocument, FormStep } from './rekyc-form.model';
import {
  updateActiveRoute,
  updateCurrentEntityDetTab,
  updateRekycFormStatus,
} from './store/rekyc-form.action';
import { FormStatus } from './store/rekyc-form.reducer';
import {
  selectRekycFormStatus,
  selectRekycStatus,
  selectRekycStepStatus,
} from './store/rekyc-form.selectors';
import { EntityDetTab } from './store/rekyc-form.state';

@Injectable({
  providedIn: 'root',
})
export class RekycFormService {
  readonly formStatus = toSignal(this.store.select(selectRekycStatus));
  private readonly stepOrder: Array<keyof FormStatus['forms']> = [
    'entityDetails',
    'ausDetails',
    'rekycForm',
    'eSign',
  ];
  private readonly stepFormKeyMap: Record<FormStep, keyof FormStatus['forms']> = {
    [FormStep.ENTITY_DETAILS]: 'entityDetails',
    [FormStep.PERSONAL_DETAILS]: 'ausDetails',
    [FormStep.KYC_FORM]: 'rekycForm',
    [FormStep.E_SIGN]: 'eSign',
  };
  readonly rekycFormStatus = toSignal(this.store.select(selectRekycFormStatus));
  readonly rekycStepStatus = toSignal(this.store.select(selectRekycStepStatus));

  private triggerFnSubject = new Subject<void>();
  triggerFn$ = this.triggerFnSubject.asObservable();

  triggerRouteHandling() {
    this.triggerFnSubject.next();
  }

  constructor(
    private store: Store,
    private api: ApiService,
  ) {
    this.triggerRouteHandling();
  }

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
    if (key === 'currentEntityDetTab') {
      this.store.dispatch(updateCurrentEntityDetTab({ tab: value as EntityDetTab }));
    } else if (key === 'activeRoute') {
      this.store.dispatch(updateActiveRoute({ activeRoute: value as FormStep }));
    }
  }

  isAnyTabMissed = () => {
    const entityDocs = this.rekycStepStatus()?.entityDocs;
    const directorDetails = this.rekycStepStatus()?.directorDetails;
    const boDetails = this.rekycStepStatus()?.boDetails;
    const isAllCompleted = entityDocs && directorDetails && boDetails;

    if (!isAllCompleted) {
      if (!entityDocs) {
        return 'entity-details';
      } else if (!directorDetails) {
        return 'directors';
      } else if (!boDetails) {
        return 'bo';
      }
    }

    this.store.dispatch(updateRekycFormStatus({ entityDetails: true }));
    this.updateRekycLS('activeRoute', 'personal-details');
    this.triggerRouteHandling();
    return null;
  };

  updatRekycFormStep(currentTab: string) {
    const formStatus = this.formStatus(); // toSignal() value
    if (!formStatus) return;

    // eslint-disable-next-line no-console
    console.log('currentTab', currentTab);
    // this.updateRekycLS('activeRoute', 'personal-details');
    // this.triggerRouteHandling();

    const entityTabs: EntityDetTab[] = ['entity-details', 'directors', 'bo'];

    // Step 1: If user is on one of the entity tabs
    if (entityTabs.includes(currentTab as EntityDetTab)) {
      const { entityDocs, directorDetails, boDetails } = formStatus.steps;

      if (!entityDocs) {
        this.store.dispatch(updateCurrentEntityDetTab({ tab: 'entity-details' }));
        return;
      }
      if (!directorDetails) {
        this.store.dispatch(updateCurrentEntityDetTab({ tab: 'directors' }));
        return;
      }
      if (!boDetails) {
        this.store.dispatch(updateCurrentEntityDetTab({ tab: 'bo' }));
        return;
      }

      if (!formStatus.forms.entityDetails) {
        this.store.dispatch(updateRekycFormStatus({ entityDetails: true }));
      }

      // All steps done, move to next major step
      this.updateRekycLS('activeRoute', 'personal-details');
      this.triggerRouteHandling();
      return;
    }

    // Step 2: Non-entity tabs
    if (currentTab === 'bo') {
      const missed = this.isAnyTabMissed();
      if (missed) {
        this.store.dispatch(updateCurrentEntityDetTab({ tab: missed }));
        return;
      }
    }

    const nextTab = !formStatus.forms.ausDetails
      ? 'personal-details'
      : !formStatus.forms.rekycForm
        ? 'rekyc-form'
        : !formStatus.forms.eSign
          ? 'eSign'
          : null;

    if (nextTab) {
      this.updateRekycLS('activeRoute', nextTab);
      this.triggerRouteHandling();
    }
  }

  canAccessStep(step: FormStep): boolean {
    const status = this.rekycFormStatus();
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
