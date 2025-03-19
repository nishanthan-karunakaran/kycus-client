import { Component } from '@angular/core';
import { Toast } from 'src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'ui-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  toasts: Toast[] = [];

  addToast(toast: Toast) {
    const newToast = {
      ...toast,
      options: {
        duration: toast.options.duration ?? 2000,
        dismissable: toast.options.dismissable ?? true,
        outlined: toast.options.outlined ?? false,
        autoClose: toast.options.autoClose ?? true,
      },
    };

    this.toasts.unshift(newToast); // add new toast to the top

    if (newToast.options.autoClose) {
      setTimeout(() => this.removeToast(newToast), newToast.options.duration);
    }
  }

  removeToast(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  toastClasses(toast: Toast) {
    return {
      // Normal filled background styles with white text
      'bg-success text-white':
        toast.type === 'success' && !toast.options.outlined,
      'bg-error text-white': toast.type === 'error' && !toast.options.outlined,
      'bg-warning text-white':
        toast.type === 'warning' && !toast.options.outlined,
      'bg-info text-white': toast.type === 'info' && !toast.options.outlined,
      'bg-danger text-white':
        toast.type === 'danger' && !toast.options.outlined,

      // Outlined styles with dark text
      'border border-success bg-successLight text-success':
        toast.type === 'success' && toast.options.outlined,
      'border border-error bg-failureLight text-failure':
        toast.type === 'error' && toast.options.outlined,
      'border border-warning bg-warningLight text-warning':
        toast.type === 'warning' && toast.options.outlined,
      'border border-info bg-infoLight text-info':
        toast.type === 'info' && toast.options.outlined,
      'border border-danger bg-dangerLight text-danger':
        toast.type === 'danger' && toast.options.outlined,

      'rounded-lg shadow-lg px-4 py-2': true,
      'grid grid-cols-[auto_1fr_auto] items-center gap-4': true,
    };
  }
  textColor(toast: Toast) {
    if (toast.options.outlined) {
      return (
        {
          success: 'text-success',
          error: 'text-failure',
          warning: 'text-warning',
          info: 'text-info',
          danger: 'text-danger',
        }[toast.type] || 'text-black'
      );
    }

    return 'text-white';
  }

  toastIcon(type: Toast['type']): string {
    const icons = {
      success: 'check-circle',
      error: 'x-circle',
      warning: 'alert-triangle',
      info: 'info',
      danger: 'alert-octagon',
    };
    return icons[type] || 'bell';
  }
}
