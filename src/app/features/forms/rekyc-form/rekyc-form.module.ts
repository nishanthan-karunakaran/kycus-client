import { NgModule } from '@angular/core';
import { SharedModule } from '@src/app/shared/shared.module';
import { RekycFormComponent } from './rekyc-form.component';
import { RekycFormRoutingModule } from './rekyc-form-routing.module';
import { RekycFormHeaderComponent } from './components/header/rekyc-form-header.component';
import { RekycEntityDetailsFormComponent } from './components/entity-details-form/entity-details-form.component';
import { RekycFormUploadWrapperComponent } from './components/rekyc-form-uploadWrapper/rekyc-form-uploadWrapper.component';

@NgModule({
  imports: [SharedModule, RekycFormRoutingModule],
  declarations: [
    RekycFormComponent,
    RekycFormHeaderComponent,
    RekycEntityDetailsFormComponent,
    RekycFormUploadWrapperComponent,
  ],
})
export class RekycFormModule {}
