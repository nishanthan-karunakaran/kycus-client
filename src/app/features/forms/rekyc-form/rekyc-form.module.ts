import { NgModule } from '@angular/core';
import { SharedModule } from '@src/app/shared/shared.module';
import { RekycFormComponent } from './rekyc-form.component';
import { RekycFormRoutingModule } from './rekyc-form-routing.module';
import { RekycFormHeaderComponent } from './components/header/rekyc-form-header.component';

@NgModule({
  imports: [SharedModule, RekycFormRoutingModule],
  declarations: [RekycFormComponent, RekycFormHeaderComponent],
})
export class RekycFormModule {}
