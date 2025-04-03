import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RekycFormComponent } from './pages/rekyc-form/rekyc-form.component';

const routes: Routes = [
  {
    path: 'rekyc',
    component: RekycFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
