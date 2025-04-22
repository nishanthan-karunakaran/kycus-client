import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@src/app/shared/shared.module';
import { RekycEmailValidationComponent } from './components/email-validation/email-validation.component';
import { EntityDetailsComponent } from './components/entity-details-form/components/entity-details/entity-details.component';
import { RekycEntityFilledbyComponent } from './components/entity-filledby/entity-filledby.component';
import { RekycFormHeaderComponent } from './components/header/rekyc-form-header.component';
import { RekycBoFormComponent } from './components/rekyc-declaration-form/components/rekyc-bo-form/rekyc-bo-form.component';
import { RekycDirectorsFormComponent } from './components/rekyc-declaration-form/components/rekyc-bo-form/rekyc-directors-form/rekyc-directors-form.component';
import { RekycDeclarationFormComponent } from './components/rekyc-declaration-form/rekyc-declaration-form.component';
import { RekycFormUploadWrapperComponent } from './components/rekyc-form-uploadWrapper/rekyc-form-uploadWrapper.component';
import { RekycHeaderSectionComponent } from './components/rekyc-kyc-form/components/rekyc-header-section/rekyc-header-section.component';
import { RekycKycFormComponent } from './components/rekyc-kyc-form/rekyc-kyc-form.component';
import { RekycPersonalDetailsComponent } from './components/rekyc-personal-details/rekyc-personal-details.component';
import { RekycFormRoutingModule } from './rekyc-form-routing.module';
import { RekycFormComponent } from './rekyc-form.component';
import { rekycFormReducers } from './store/rekyc-form.reducer';
import { RekycEntityDetailsFormComponent } from './components/entity-details-form/entity-details-form.component';

@NgModule({
  imports: [
    SharedModule,
    RekycFormRoutingModule,
    StoreModule.forFeature('rekycForm', rekycFormReducers),
  ],
  declarations: [
    RekycFormComponent,
    RekycFormHeaderComponent,
    RekycEmailValidationComponent,
    RekycEntityFilledbyComponent,
    RekycEntityDetailsFormComponent,
    EntityDetailsComponent,
    RekycDeclarationFormComponent,
    RekycDirectorsFormComponent,
    RekycBoFormComponent,
    RekycFormUploadWrapperComponent,
    RekycPersonalDetailsComponent,
    RekycKycFormComponent,
    RekycHeaderSectionComponent,
  ],
})
export class RekycFormModule {}
