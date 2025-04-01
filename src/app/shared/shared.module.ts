import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  Bell,
  BellRing,
  Check,
  CheckCircle,
  Download,
  Eye,
  FileText,
  Info,
  Landmark,
  LaptopMinimalCheck,
  LucideAngularModule,
  Search,
  SlidersHorizontal,
  Upload,
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
import { SheetComponent } from './ui/sheet/sheet.component';
import { ButtonComponent } from './ui/button/button.component';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { InputDebounceComponent } from './ui/input-debounce/input-debounce.component';

@NgModule({
  declarations: [
    ToastComponent,
    ModalComponent,
    OtpComponent,
    InputComponent,
    InputDebounceComponent,
    TableComponent,
    SheetComponent,
    ButtonComponent,
    PaginationComponent,
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
      SlidersHorizontal,
      Eye,
      Download,
      BellRing,
      Upload,
      Search,
      ArrowLeft,
      ArrowRight,
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
    InputDebounceComponent,
    TableComponent,
    SheetComponent,
    ButtonComponent,
    PaginationComponent,
  ],
})
export class SharedModule {}
