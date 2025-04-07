import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RekycFormComponent } from './rekyc-form.component';

const routes: Routes = [
  {
    path: '',
    component: RekycFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RekycFormRoutingModule {}
