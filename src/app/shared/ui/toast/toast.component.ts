import { Component, OnInit } from '@angular/core';
import { Toast, ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  toast: Toast | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    // this.toastService.toast$.subscribe((toast) => {
    //   this.toast = toast;
    // });
  }

  get toastClass() {
    if (!this.toast) return '';
    switch (this.toast.type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100';
      case 'info':
        return 'bg-blue-100 dark:bg-blue-900 border-blue-500 dark:border-blue-700 text-blue-900 dark:text-blue-100';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900 border-yellow-500 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100';
      case 'error':
        return 'bg-red-100 dark:bg-red-900 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100';
      default:
        return '';
    }
  }

  get iconClass() {
    if (!this.toast) return '';
    switch (this.toast.type) {
      case 'success':
        return 'text-green-600';
      case 'info':
        return 'text-blue-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return '';
    }
  }
}
