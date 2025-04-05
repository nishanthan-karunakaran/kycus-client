import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RekycRoutingModule } from './rekyc-routing.module';
import { RekycComponent } from './rekyc.component';
import { FilemodalComponent } from './components/filemodal/filemodal.component';
import { StoreModule } from '@ngrx/store';
import { rekycReducer } from './store/rekyc.reducers';
import { ReKycStatusClassPipe, ReKycStatusLabelPipe } from './common/rekyc.pipe';

@NgModule({
  imports: [SharedModule, RekycRoutingModule, StoreModule.forFeature('rekyc', rekycReducer)],
  declarations: [RekycComponent, FilemodalComponent, ReKycStatusLabelPipe, ReKycStatusClassPipe],
})
export class RekycModule {}
