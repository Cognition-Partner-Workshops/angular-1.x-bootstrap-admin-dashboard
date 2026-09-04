import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActiveToast, GlobalConfig, IndividualConfig, ToastrService } from 'ngx-toastr';
import { BaPanelComponent } from '../../../theme';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastQuote {
  title: string | null;
  message: string;
  options?: { allowHtml: boolean };
}

interface NotificationOptions {
  autoDismiss: boolean;
  positionClass: string;
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
  title: string;
  msg: string;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [BaPanelComponent, FormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnDestroy {
  readonly types: ToastType[] = ['success', 'error', 'info', 'warning'];
  readonly quotes: ToastQuote[] = [
    { title: 'Come to Freenode', message: 'We rock at <em>#angularjs</em>', options: { allowHtml: true } },
    { title: 'Looking for bootstrap?', message: 'Try ui-bootstrap out!' },
    { title: 'Wants a better router?', message: 'We have you covered with ui-router' },
    { title: 'Angular 2', message: 'Is gonna rock the world' },
    { title: null, message: 'Titles are not always needed' },
    { title: null, message: 'Toastr rock!' },
    { title: 'What about nice html?', message: '<strong>Sure you <em>can!</em></strong>', options: { allowHtml: true } },
    { title: 'Ionic is <em>cool</em>', message: 'Best mobile framework ever', options: { allowHtml: true } },
  ];
  readonly options: NotificationOptions = {
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
    msg: 'Type your message here',
  };
  optionsStr = '';
  private readonly defaultConfig: GlobalConfig;
  private readonly openedToasts: ActiveToast<unknown>[] = [];

  constructor(private readonly toastr: ToastrService) {
    this.defaultConfig = { ...this.toastr.toastrConfig };
  }

  private toIndividual(o: NotificationOptions): Partial<IndividualConfig> & Partial<GlobalConfig> {
    return {
      timeOut: Number(o.timeOut),
      extendedTimeOut: Number(o.extendedTimeOut),
      closeButton: o.closeButton,
      enableHtml: o.allowHtml,
      tapToDismiss: o.tapToDismiss,
      progressBar: o.progressBar,
      positionClass: o.positionClass,
      newestOnTop: o.newestOnTop,
      maxOpened: Number(o.maxOpened),
      preventDuplicates: o.preventDuplicates,
      autoDismiss: o.autoDismiss,
    };
  }

  openToast(): void {
    const individual = this.toIndividual(this.options);
    Object.assign(this.toastr.toastrConfig, individual);
    const toast = this.toastr[this.options.type](this.options.msg, this.options.title, individual);
    this.openedToasts.push(toast as ActiveToast<unknown>);
    const { msg: _msg, title: _title, ...strOptions } = this.options;
    this.optionsStr = `toastr.${this.options.type}('${this.options.msg}', '${this.options.title}', ${JSON.stringify(strOptions, null, 2)})`;
  }

  openRandomToast(): void {
    const toastType = this.types[Math.floor(Math.random() * this.types.length)];
    const toastQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    const options = toastQuote.options?.allowHtml ? { enableHtml: true } : {};
    const toast = this.toastr[toastType](toastQuote.message, toastQuote.title ?? undefined, options);
    this.openedToasts.push(toast as ActiveToast<unknown>);
    this.optionsStr = `toastr.${toastType}('${toastQuote.message}', '${String(toastQuote.title)}', ${JSON.stringify(toastQuote.options || {}, null, 2)})`;
  }

  clearToasts(): void {
    this.toastr.clear();
  }

  clearLastToast(): void {
    const toast = this.openedToasts.pop();
    if (toast) {
      this.toastr.clear(toast.toastId);
    }
  }

  ngOnDestroy(): void {
    Object.assign(this.toastr.toastrConfig, this.defaultConfig);
  }
}
