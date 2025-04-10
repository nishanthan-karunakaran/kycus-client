import { NgModule } from '@angular/core';
import { SharedModule } from '@src/app/shared/shared.module';
import { RekycFormComponent } from './rekyc-form.component';
import { RekycFormRoutingModule } from './rekyc-form-routing.module';
import { RekycFormHeaderComponent } from './components/header/rekyc-form-header.component';
import { RekycEntityDetailsFormComponent } from './components/entity-details-form/entity-details-form.component';
import { RekycFormUploadWrapperComponent } from './components/rekyc-form-uploadWrapper/rekyc-form-uploadWrapper.component';
import { RekycDeclarationFormComponent } from './components/rekyc-declaration-form/rekyc-declaration-form.component';
import { RekycBoFormComponent } from './components/rekyc-declaration-form/components/rekyc-bo-form/rekyc-bo-form.component';
import { RekycPersonalDetailsComponent } from './components/rekyc-personal-details/rekyc-personal-details.component';
import { RekycKycFormComponent } from './components/rekyc-kyc-form/rekyc-kyc-form.component';
import { RekycHeaderSectionComponent } from './components/rekyc-kyc-form/components/rekyc-header-section/rekyc-header-section.component';
import { RekycEmailValidationComponent } from './components/email-validation/email-validation.component';
import { RekycDirectorsFormComponent } from './components/rekyc-declaration-form/components/rekyc-bo-form/rekyc-directors-form/rekyc-directors-form.component';

@NgModule({
  imports: [SharedModule, RekycFormRoutingModule],
  declarations: [
    RekycFormComponent,
    RekycFormHeaderComponent,
    RekycEmailValidationComponent,
    RekycEntityDetailsFormComponent,
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
