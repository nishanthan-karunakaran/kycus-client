import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RekycRoutingModule } from './rekyc-routing.module';
import { RekycComponent } from './rekyc.component';

@NgModule({
  imports: [SharedModule, RekycRoutingModule],
  declarations: [RekycComponent],
})
export class RekycModule {}
