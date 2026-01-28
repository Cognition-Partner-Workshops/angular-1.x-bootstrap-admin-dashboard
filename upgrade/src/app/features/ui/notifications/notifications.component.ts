import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService, ToastConfig, ToastType, ToastPosition } from './toast.service';

interface Quote {
  title: string | null;
  message: string;
  options?: Partial<ToastConfig>;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnDestroy {
  private toastService = inject(ToastService);

  types: ToastType[] = ['success', 'error', 'info', 'warning'];

  quotes: Quote[] = [
    {
      title: 'Come to Freenode',
      message: 'We rock at <em>#angularjs</em>',
      options: { allowHtml: true }
    },
    {
      title: 'Looking for bootstrap?',
      message: 'Try ui-bootstrap out!'
    },
    {
      title: 'Wants a better router?',
      message: 'We have you covered with ui-router'
    },
    {
      title: 'Angular 2',
      message: 'Is gonna rock the world'
    },
    {
      title: null,
      message: 'Titles are not always needed'
    },
    {
      title: null,
      message: 'Toastr rock!'
    },
    {
      title: 'What about nice html?',
      message: '<strong>Sure you <em>can!</em></strong>',
      options: { allowHtml: true }
    },
    {
      title: 'Ionic is <em>cool</em>',
      message: 'Best mobile framework ever',
      options: { allowHtml: true }
    }
  ];

  options: ToastConfig & { title: string; msg: string } = {
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
    preventOpenDuplicates: false,
    title: 'Some title here',
    msg: 'Type your message here'
  };

  optionsStr = '';

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  openToast(): void {
    const config: Partial<ToastConfig> = {
      autoDismiss: this.options.autoDismiss,
      positionClass: this.options.positionClass,
      timeOut: this.options.timeOut,
      extendedTimeOut: this.options.extendedTimeOut,
      allowHtml: this.options.allowHtml,
      closeButton: this.options.closeButton,
      tapToDismiss: this.options.tapToDismiss,
      progressBar: this.options.progressBar,
      newestOnTop: this.options.newestOnTop,
      maxOpened: this.options.maxOpened,
      preventDuplicates: this.options.preventDuplicates,
      preventOpenDuplicates: this.options.preventOpenDuplicates
    };

    this.toastService.setConfig(config);
    this.toastService[this.options.type](this.options.msg, this.options.title, config);

    const strOptions: Record<string, unknown> = {};
    for (const key in this.options) {
      if (key !== 'msg' && key !== 'title') {
        strOptions[key] = this.options[key as keyof typeof this.options];
      }
    }
    this.optionsStr = `toastr.${this.options.type}('${this.options.msg}', '${this.options.title}', ${JSON.stringify(strOptions, null, 2)})`;
  }

  openRandomToast(): void {
    const typeIndex = Math.floor(Math.random() * this.types.length);
    const quoteIndex = Math.floor(Math.random() * this.quotes.length);
    const toastType = this.types[typeIndex];
    const toastQuote = this.quotes[quoteIndex];

    this.toastService[toastType](toastQuote.message, toastQuote.title, toastQuote.options);
    this.optionsStr = `toastr.${toastType}('${toastQuote.message}', '${toastQuote.title}', ${JSON.stringify(toastQuote.options || {}, null, 2)})`;
  }

  clearToasts(): void {
    this.toastService.clear();
  }

  clearLastToast(): void {
    this.toastService.clearLast();
  }

  get positionOptions(): { value: ToastPosition; label: string }[] {
    return [
      { value: 'toast-top-right', label: 'Top Right' },
      { value: 'toast-bottom-right', label: 'Bottom Right' },
      { value: 'toast-bottom-left', label: 'Bottom Left' },
      { value: 'toast-top-left', label: 'Top Left' },
      { value: 'toast-top-full-width', label: 'Top Full Width' },
      { value: 'toast-bottom-full-width', label: 'Bottom Full Width' },
      { value: 'toast-top-center', label: 'Top Center' },
      { value: 'toast-bottom-center', label: 'Bottom Center' }
    ];
  }
}
