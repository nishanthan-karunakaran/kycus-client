import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ApiInterceptor } from 'src/app/core/interceptors/api.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
