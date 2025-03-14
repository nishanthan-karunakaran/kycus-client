import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  LucideAngularModule,
  X,
  XCircle,
} from 'lucide-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LucideAngularModule.pick({
      X,
      CheckCircle,
      XCircle,
      AlertTriangle,
      Info,
      AlertOctagon,
    }),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
