import { Injectable, ComponentRef, Type, ApplicationRef, createComponent, EnvironmentInjector, inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface ModalConfig {
  title?: string;
  size?: 'small' | 'medium' | 'large';
  closable?: boolean;
  data?: Record<string, unknown>;
}

export interface ModalRef<T = unknown> {
  close: (result?: T) => void;
  afterClosed: () => Observable<T | undefined>;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalStack: ComponentRef<unknown>[] = [];
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  open<C, R = unknown>(component: Type<C>, config: ModalConfig = {}): ModalRef<R> {
    const closeSubject = new Subject<R | undefined>();

    const modalRef: ModalRef<R> = {
      close: (result?: R) => {
        closeSubject.next(result);
        closeSubject.complete();
        this.closeTopModal();
      },
      afterClosed: () => closeSubject.asObservable()
    };

    const componentRef = createComponent(component, {
      environmentInjector: this.injector
    });

    const instance = componentRef.instance as Record<string, unknown>;
    if (config.data) {
      Object.assign(instance, config.data);
    }
    instance['modalRef'] = modalRef;
    instance['config'] = config;

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as unknown as { rootNodes: Node[] }).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.modalStack.push(componentRef);

    return modalRef;
  }

  private closeTopModal(): void {
    const componentRef = this.modalStack.pop();
    if (componentRef) {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }
  }

  closeAll(): void {
    while (this.modalStack.length > 0) {
      this.closeTopModal();
    }
  }

  hasOpenModals(): boolean {
    return this.modalStack.length > 0;
  }
}
