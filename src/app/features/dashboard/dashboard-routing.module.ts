import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from './pages/wallet/wallet.component';
import { EntityComponent } from './pages/entity/entity.component';
import { ConsentComponent } from './pages/consent/consent.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'wallet',
    pathMatch: 'full',
  },
  {
    path: 'wallet',
    component: WalletComponent,
  },
  {
    path: 'entity',
    component: EntityComponent,
  },
  {
    path: 'consent',
    component: ConsentComponent,
  },
  {
    path: '**',
    redirectTo: 'wallet',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
