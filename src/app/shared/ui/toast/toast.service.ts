import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
} from '@angular/core';
import { ToastComponent } from './toast.component';

export interface Toast {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  description?: string; // Optional field for additional information
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private cfr: ComponentFactoryResolver,
  ) {}

  private toastContainer: HTMLElement | null = null;

  showToast(toast: Toast) {
    if (!this.toastContainer) {
      this.toastContainer = document.createElement('div');
      document.body.appendChild(this.toastContainer);
    }

    const factory = this.cfr.resolveComponentFactory(ToastComponent);
    const componentRef = factory.create(this.injector);

    componentRef.instance.toast = toast;

    this.appRef.attachView(componentRef.hostView);
    this.toastContainer?.appendChild(componentRef.location.nativeElement);

    // Remove toast after some time (e.g., 5 seconds)
    setTimeout(() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }, 5000); // Adjust time as needed
  }
}
