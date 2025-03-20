import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardLayoutRoutingModule } from './dashboard-layout-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout.component';

@NgModule({
  imports: [
    SharedModule,
    DashboardLayoutRoutingModule
  ],
  declarations: [DashboardLayoutComponent]
})
export class DashboardLayoutModule { }
