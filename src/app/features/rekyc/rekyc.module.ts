import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RekycRoutingModule } from './rekyc-routing.module';
import { RekycComponent } from './rekyc.component';
import { FilemodalComponent } from './components/filemodal/filemodal.component';

@NgModule({
  imports: [SharedModule, RekycRoutingModule],
  declarations: [RekycComponent, FilemodalComponent],
})
export class RekycModule {}
