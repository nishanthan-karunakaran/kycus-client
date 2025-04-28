import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DoCheck,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiStatus } from '@core/constants/api.response';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectEntityInfo } from './components/entity-filledby/store/entity-info.selectors';
import { selectAusInfo } from './components/rekyc-personal-details/store/personal-details.selectors';
import { FormPage, FormStep } from './rekyc-form.model';
import { RekycFormService } from './rekyc-form.service';
import {
  updateActiveRoute,
  updateRekycFormStatus,
  updateRekycStepStatus,
} from './store/rekyc-form.action';
import {
  selectRekycActiveRoute,
  selectRekycFormStatus,
  selectRekycStatus,
} from './store/rekyc-form.selectors';

@Component({
  selector: 'app-rekyc-form',
  templateUrl: './rekyc-form.component.html',
  styleUrls: ['./rekyc-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycFormComponent implements OnInit, DoCheck, OnDestroy {
  currentForm = toSignal(this.store.select(selectRekycActiveRoute));
  formList = signal<FormPage[]>([
    { label: 'Entity Details', step: FormStep.ENTITY_DETAILS, isCompleted: false, canShow: true },
    {
      label: 'AUS Details',
      step: FormStep.PERSONAL_DETAILS,
      isCompleted: false,
      canShow: true,
    },
    { label: 'KYC Form', step: FormStep.KYC_FORM, isCompleted: false, canShow: true },
    { label: 'E-Sign', step: FormStep.E_SIGN, isCompleted: false, canShow: true },
  ]);
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
  readonly isAuthenticated = computed(() => this.ausInfo()?.isAuthenticated);
  // readonly isAuthenticated = () => true;
  readonly formStatus = toSignal(this.store.select(selectRekycStatus));
  private destroy$ = new Subject<void>();
  readonly rekycFormStatus = toSignal(this.store.select(selectRekycFormStatus));

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private store: Store,
    private rekycFormService: RekycFormService,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.tabCompletionStatus();

    this.rekycFormService.triggerFn$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.handleInitialRoute();
      this.cdRef.markForCheck(); // Important with OnPush
    });

    this.updateFormList();

    this.handleInitialRoute();
    this.applicationToken = this.activatedRouter.snapshot.queryParamMap.get('token');
  }

  ngDoCheck(): void {
    this.updateFormList();
  }

  updateFormList(): void {
    const rekycFormStatus = this.rekycFormStatus();

    if (!rekycFormStatus) return;

    // Log to confirm that the state is updated
    // eslint-disable-next-line no-console
    console.log('Updated rekycFormStatus:', rekycFormStatus);

    const updatedFormList = [
      {
        label: 'Entity Details',
        step: FormStep.ENTITY_DETAILS,
        isCompleted: rekycFormStatus.entityDetails, // Signal value
        canShow: true,
      },
      {
        label: 'AUS Details',
        step: FormStep.PERSONAL_DETAILS,
        isCompleted: rekycFormStatus.ausDetails, // Signal value
        canShow: true,
      },
      {
        label: 'KYC Form',
        step: FormStep.KYC_FORM,
        isCompleted: rekycFormStatus.rekycForm, // Signal value
        canShow: true,
      },
      { label: 'E-Sign', step: FormStep.E_SIGN, isCompleted: rekycFormStatus.eSign, canShow: true },
    ];

    // Set the updated form list
    this.formList.set(updatedFormList);

    // Trigger change detection
    this.cdRef.markForCheck(); // Notify Angular to check the component again
  }

  handleInitialRoute() {
    const rekycData = localStorage.getItem('rekyc');
    let activeRoute = 'entity-details';

    const parsed = rekycData ? JSON.parse(rekycData) : null;
    if (parsed?.activeRoute) {
      activeRoute = parsed.activeRoute;
    }

    // Construct the full path
    const basePath = '/application/rekyc/';
    const fullPath = basePath + activeRoute;

    // Log the full path before navigating
    // eslint-disable-next-line no-console
    console.log('Full path to navigate to:', fullPath);

    // Get current query parameters from the activated route (preserve them)
    const currentParams = this.activatedRouter.snapshot.queryParams;

    // Perform the navigation
    this.router.navigate([fullPath], {
      queryParams: currentParams, // Preserve query params like token
      queryParamsHandling: 'preserve', // Ensure queryParams are retained
    });
  }

  trackStep(_index: number, step: FormPage) {
    return step.step;
  }

  isStepDisabled(step: FormStep, canShow: boolean): boolean {
    return !canShow || !this.rekycFormService.canAccessStep(step);
  }

  setCurrentForm(item: FormPage) {
    if (item.canShow && this.rekycFormService.canAccessStep(item.step)) {
      this.store.dispatch(updateActiveRoute({ activeRoute: item.step }));

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

  tabCompletionStatus() {
    const ausId = this.ausInfo()?.ausId as string;

    this.rekycFormService
      .tabCompletionStatus(ausId)
      // .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { status, data } = response as any;

            if (status === ApiStatus.SUCCESS) {
              const { ausDetails, boDetails, directorDetails, eSign, entityDocs, rekycForm } = data;

              const entityDetails = entityDocs && directorDetails && boDetails;

              this.store.dispatch(
                updateRekycStepStatus({ entityDocs, directorDetails, boDetails }),
              );
              this.store.dispatch(
                updateRekycFormStatus({ entityDetails, ausDetails, rekycForm, eSign }),
              );
              this.formList.set([
                {
                  label: 'Entity Details',
                  step: FormStep.ENTITY_DETAILS,
                  isCompleted: entityDetails,
                  canShow: true,
                },
                {
                  label: 'AUS Details',
                  step: FormStep.PERSONAL_DETAILS,
                  isCompleted: ausDetails,
                  canShow: true,
                },
                {
                  label: 'KYC Form',
                  step: FormStep.KYC_FORM,
                  isCompleted: rekycForm,
                  canShow: true,
                },
                { label: 'E-Sign', step: FormStep.E_SIGN, isCompleted: eSign, canShow: true },
              ]);
            }
          }
        },
      });
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
    // eslint-disable-next-line no-console
    console.log('object');
    this.destroy$.next();
    this.destroy$.complete();
  }
}
