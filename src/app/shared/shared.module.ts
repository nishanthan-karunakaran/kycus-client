import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AlertOctagon,
  AlertTriangle,
  Check,
  CheckCircle,
  Info,
  LucideAngularModule,
  X,
  XCircle,
} from 'lucide-angular';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { ModalComponent } from 'src/app/shared/ui/modal/modal.component';
import { OtpComponent } from 'src/app/shared/ui/otp/otp.component';
import { ToastComponent } from 'src/app/shared/ui/toast/toast.component';
import { InputFormatDirective } from '../core/directives/input-format.directive';

@NgModule({
  declarations: [ToastComponent, ModalComponent, OtpComponent, InputComponent],
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
      Check,
    }),
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputFormatDirective,
    LucideAngularModule,
    ToastComponent,
    ModalComponent,
    OtpComponent,
    InputComponent,
  ],
})
export class SharedModule {}
