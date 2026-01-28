import { Injectable, ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, inject } from '@angular/core';
import { ToastContainerComponent } from './toast-container.component';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
  | 'toast-top-right'
  | 'toast-bottom-right'
  | 'toast-bottom-left'
  | 'toast-top-left'
  | 'toast-top-full-width'
  | 'toast-bottom-full-width'
  | 'toast-top-center'
  | 'toast-bottom-center';

export interface ToastConfig {
  autoDismiss: boolean;
  positionClass: ToastPosition;
  type: ToastType;
  timeOut: string;
  extendedTimeOut: string;
  allowHtml: boolean;
  closeButton: boolean;
  tapToDismiss: boolean;
  progressBar: boolean;
  newestOnTop: boolean;
  maxOpened: number;
  preventDuplicates: boolean;
  preventOpenDuplicates: boolean;
}

export interface Toast {
  id: string;
  type: ToastType;
  title: string | null;
  message: string;
  options?: Partial<ToastConfig>;
  timeoutId?: ReturnType<typeof setTimeout>;
  progressTimeoutId?: ReturnType<typeof setTimeout>;
  progress?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts: Toast[] = [];
  private idCounter = 0;
  private containerRef: ComponentRef<ToastContainerComponent> | null = null;
  private config: ToastConfig = {
    autoDismiss: false,
    positionClass: 'toast-top-right',
    type: 'info',
    timeOut: '5000',
    extendedTimeOut: '2000',
    allowHtml: false,
    closeButton: false,
    tapToDismiss: true,
    progressBar: false,
    newestOnTop: true,
    maxOpened: 0,
    preventDuplicates: false,
    preventOpenDuplicates: false
  };
  private previousMessages: string[] = [];
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  private ensureContainer(): void {
    if (this.containerRef) return;

    const containerEl = document.createElement('div');
    containerEl.id = 'toast-container-wrapper';
    document.body.appendChild(containerEl);

    this.containerRef = createComponent(ToastContainerComponent, {
      environmentInjector: this.injector,
      hostElement: containerEl
    });

    this.containerRef.instance.toastService = this;
    this.appRef.attachView(this.containerRef.hostView);
  }

  getToasts(): Toast[] {
    return this.toasts;
  }

  getConfig(): ToastConfig {
    return this.config;
  }

  setConfig(config: Partial<ToastConfig>): void {
    this.config = { ...this.config, ...config };
  }

  success(message: string, title: string | null = null, options?: Partial<ToastConfig>): Toast {
    return this.show('success', message, title, options);
  }

  info(message: string, title: string | null = null, options?: Partial<ToastConfig>): Toast {
    return this.show('info', message, title, options);
  }

  warning(message: string, title: string | null = null, options?: Partial<ToastConfig>): Toast {
    return this.show('warning', message, title, options);
  }

  error(message: string, title: string | null = null, options?: Partial<ToastConfig>): Toast {
    return this.show('error', message, title, options);
  }

  show(type: ToastType, message: string, title: string | null = null, options?: Partial<ToastConfig>): Toast {
    this.ensureContainer();

    const mergedConfig = { ...this.config, ...options };
    const messageKey = `${type}:${title}:${message}`;

    if (mergedConfig.preventDuplicates && this.previousMessages.includes(messageKey)) {
      const existingToast = this.toasts.find(t =>
        t.type === type && t.title === title && t.message === message
      );
      if (existingToast) return existingToast;
    }

    if (mergedConfig.preventOpenDuplicates) {
      const openToast = this.toasts.find(t =>
        t.type === type && t.title === title && t.message === message
      );
      if (openToast) return openToast;
    }

    if (mergedConfig.maxOpened > 0 && this.toasts.length >= mergedConfig.maxOpened) {
      if (mergedConfig.autoDismiss) {
        const toastToRemove = mergedConfig.newestOnTop
          ? this.toasts[this.toasts.length - 1]
          : this.toasts[0];
        this.clear(toastToRemove);
      } else {
        return this.toasts[0];
      }
    }

    const toast: Toast = {
      id: `toast-${++this.idCounter}`,
      type,
      title,
      message,
      options: mergedConfig,
      progress: 100
    };

    if (mergedConfig.newestOnTop) {
      this.toasts.unshift(toast);
    } else {
      this.toasts.push(toast);
    }

    this.previousMessages.push(messageKey);

    const timeOut = parseInt(mergedConfig.timeOut, 10);
    if (timeOut > 0) {
      this.startTimeout(toast, timeOut, mergedConfig.progressBar);
    }

    this.updateContainer();
    return toast;
  }

  private startTimeout(toast: Toast, duration: number, showProgress: boolean): void {
    if (showProgress) {
      const startTime = Date.now();
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        toast.progress = remaining;
        this.updateContainer();
        if (remaining > 0) {
          toast.progressTimeoutId = setTimeout(updateProgress, 50);
        }
      };
      updateProgress();
    }

    toast.timeoutId = setTimeout(() => {
      this.clear(toast);
    }, duration);
  }

  pauseTimeout(toast: Toast): void {
    if (toast.timeoutId) {
      clearTimeout(toast.timeoutId);
      toast.timeoutId = undefined;
    }
    if (toast.progressTimeoutId) {
      clearTimeout(toast.progressTimeoutId);
      toast.progressTimeoutId = undefined;
    }
  }

  resumeTimeout(toast: Toast): void {
    const config = toast.options ?? this.config;
    const extendedTimeOut = parseInt(config.extendedTimeOut ?? '2000', 10);
    if (extendedTimeOut > 0) {
      this.startTimeout(toast, extendedTimeOut, config.progressBar ?? false);
    }
  }

  clear(toast?: Toast): void {
    if (toast) {
      if (toast.timeoutId) {
        clearTimeout(toast.timeoutId);
      }
      if (toast.progressTimeoutId) {
        clearTimeout(toast.progressTimeoutId);
      }
      this.toasts = this.toasts.filter(t => t.id !== toast.id);
    } else {
      this.toasts.forEach(t => {
        if (t.timeoutId) clearTimeout(t.timeoutId);
        if (t.progressTimeoutId) clearTimeout(t.progressTimeoutId);
      });
      this.toasts = [];
    }
    this.updateContainer();
  }

  clearLast(): void {
    if (this.toasts.length > 0) {
      const lastToast = this.toasts[0];
      this.clear(lastToast);
    }
  }

  private updateContainer(): void {
    if (this.containerRef) {
      this.containerRef.instance.toasts = [...this.toasts];
      this.containerRef.instance.positionClass = this.config.positionClass;
      this.containerRef.changeDetectorRef.detectChanges();
    }
  }

  onToastClick(toast: Toast): void {
    const config = toast.options ?? this.config;
    if (config.tapToDismiss) {
      this.clear(toast);
    }
  }
}
