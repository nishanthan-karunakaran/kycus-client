import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { ToastComponent } from './toast.component';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'danger';

export interface Toast {
  id?: string | number;
  type: ToastType;
  message: string;
  options: ToastOptions;
  animationClass?: string;
}

export interface ToastOptions {
  duration?: number;
  dismissable?: boolean;
  outlined?: boolean;
  autoClose?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastContainer?: ComponentRef<ToastComponent>;

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private resolver: ComponentFactoryResolver,
  ) {}

  private ensureToastContainer() {
    if (!this.toastContainer) {
      const factory = this.resolver.resolveComponentFactory(ToastComponent);
      this.toastContainer = factory.create(this.injector);
      this.appRef.attachView(this.toastContainer.hostView);
      document.body.appendChild(this.toastContainer.location.nativeElement);
    }
  }

  show(type: ToastType, message: string, options: ToastOptions) {
    this.ensureToastContainer();
    this.toastContainer?.instance.addToast({
      type,
      message,
      options,
    });
  }

  success(message: string, options: ToastOptions = {}) {
    this.show('success', message, options);
  }

  error(message: string, options: ToastOptions = {}) {
    this.show('error', message, options);
  }

  warning(message: string, options: ToastOptions = {}) {
    this.show('warning', message, options);
  }

  info(message: string, options: ToastOptions = {}) {
    this.show('info', message, options);
  }

  danger(message: string, options: ToastOptions = {}) {
    this.show('danger', message, options);
  }
}
