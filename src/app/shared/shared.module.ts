import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Bell,
  Check,
  CheckCircle,
  FileText,
  Info,
  Landmark,
  LaptopMinimalCheck,
  LucideAngularModule,
  User,
  UserRound,
  Wallet,
  X,
  XCircle,
} from 'lucide-angular';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { ModalComponent } from 'src/app/shared/ui/modal/modal.component';
import { OtpComponent } from 'src/app/shared/ui/otp/otp.component';
import { ToastComponent } from 'src/app/shared/ui/toast/toast.component';
import { InputFormatDirective } from 'src/app/core/directives/input-format.directive';
import { TableComponent } from './ui/table/table.component';

@NgModule({
  declarations: [
    ToastComponent,
    ModalComponent,
    OtpComponent,
    InputComponent,
    TableComponent,
  ],
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
      UserRound,
      User,
      Bell,
      Landmark,
      Wallet,
      FileText,
      LaptopMinimalCheck,
      ArrowUp,
      ArrowDown,
      ArrowUpDown,
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
    TableComponent,
  ],
})
export class SharedModule {}
