import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectEntityInfo } from './components/entity-filledby/store/entity-info.selectors';
import { selectAusInfo } from './components/rekyc-personal-details/store/personal-details.selectors';
import { FormPage, FormStep } from './rekyc-form.model';
import { RekycFormService } from './rekyc-form.service';

@Component({
  selector: 'app-rekyc-form',
  templateUrl: './rekyc-form.component.html',
  styleUrls: ['./rekyc-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycFormComponent implements OnInit {
  currentForm = signal<FormStep>(FormStep.ENTITY_DETAILS);
  formList: FormPage[] = [
    { label: 'Entity Details', step: FormStep.ENTITY_DETAILS, isCompleted: false, canShow: true },
    // { label: 'Declaration', step: FormStep.DECLARATION, isCompleted: false, canShow: true },
    {
      label: 'AUS Details',
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
    // FormStep.DECLARATION,
    FormStep.PERSONAL_DETAILS,
    FormStep.KYC_FORM,
    FormStep.E_SIGN,
  ];
  applicationToken: string | null = null;
  readonly ausInfo = toSignal(this.store.select(selectAusInfo));
  readonly entityInfo = toSignal(this.store.select(selectEntityInfo));
  // readonly isAuthenticated = computed(() => this.ausInfo()?.isAuthenticated);
  readonly isAuthenticated = () => true;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private store: Store,
    private rekycFormService: RekycFormService,
  ) {}

  ngOnInit(): void {
    this.handleInitialRoute();
    this.applicationToken = this.activatedRouter.snapshot.queryParamMap.get('token');
  }

  handleInitialRoute() {
    const rekycData = localStorage.getItem('rekyc');
    let activeRoute = 'entity-details';

    const parsed = rekycData ? JSON.parse(rekycData) : null;
    if (parsed?.activeRoute) {
      activeRoute = parsed.activeRoute;
    }

    this.currentForm.set(activeRoute as FormStep);

    if (
      this.activatedRouter.snapshot.routeConfig?.path === '' &&
      this.activatedRouter.snapshot.children.length === 0
    ) {
      this.router.navigate([activeRoute], {
        relativeTo: this.activatedRouter,
        queryParamsHandling: 'preserve',
      });
    }
  }

  trackStep(_index: number, step: FormPage) {
    return step.step;
  }

  isStepDisabled(step: FormStep, canShow: boolean): boolean {
    return !canShow || !this.rekycFormService.canAccessStep(step);
  }

  setCurrentForm(item: FormPage) {
    if (item.canShow && this.rekycFormService.canAccessStep(item.step)) {
      this.currentForm.set(item.step);

      const rekycData = localStorage.getItem('rekyc');
      const currentRekyc = rekycData ? JSON.parse(rekycData) : { activeRoute: '' };

      currentRekyc.activeRoute = item.step; // Update only activeRoute
      localStorage.setItem('rekyc', JSON.stringify(currentRekyc));

      // Navigate to the new route, preserve query params (like token)
      this.router.navigate([item.step], {
        relativeTo: this.activatedRouter,
        queryParamsHandling: 'preserve', // keeps the token query param
      });
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
