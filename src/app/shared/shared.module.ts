import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  LucideAngularModule,
  X,
  XCircle,
} from 'lucide-angular';
import { ModalComponent } from 'src/app/shared/ui/modal/modal.component';
import { ToastComponent } from 'src/app/shared/ui/toast/toast.component';
import { InputFormatDirective } from '../core/directives/input-format.directive';

@NgModule({
  declarations: [ToastComponent, ModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputFormatDirective,
    LucideAngularModule.pick({
      X,
      CheckCircle,
      XCircle,
      AlertTriangle,
      Info,
      AlertOctagon,
    }),
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputFormatDirective,
    ToastComponent,
    ModalComponent,
    LucideAngularModule,
  ],
})
export class SharedModule {}
