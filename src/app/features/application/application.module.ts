import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RekycFormComponent } from './pages/rekyc-form/rekyc-form.component';
import { ApplicationRoutingModule } from './application-routing.module';

@NgModule({
  imports: [SharedModule, ApplicationRoutingModule],
  declarations: [RekycFormComponent],
})
export class ApplicationModule {}
