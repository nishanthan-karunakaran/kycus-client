import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RekycFormComponent } from './rekyc-form.component';
import { RekycEntityDetailsFormComponent } from './components/entity-details-form/entity-details-form.component';
import { RekycDeclarationFormComponent } from './components/rekyc-declaration-form/rekyc-declaration-form.component';
import { RekycPersonalDetailsComponent } from './components/rekyc-personal-details/rekyc-personal-details.component';
import { RekycKycFormComponent } from './components/rekyc-kyc-form/rekyc-kyc-form.component';

const routes: Routes = [
  {
    path: '',
    component: RekycFormComponent,
    children: [
      {
        path: 'entity-details',
        component: RekycEntityDetailsFormComponent,
      },
      {
        path: 'declaration',
        component: RekycDeclarationFormComponent,
      },
      {
        path: 'personal-details',
        component: RekycPersonalDetailsComponent,
      },
      {
        path: 'rekyc-form',
        component: RekycKycFormComponent,
      },
      // {
      //   path: 'e-sign',
      //   component: Rekuyce,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RekycFormRoutingModule {}
