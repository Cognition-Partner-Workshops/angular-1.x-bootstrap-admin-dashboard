import { Component, OnDestroy, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'content-top',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="content-top clearfix">
      <h1 class="al-title">{{ activePageTitle() }}</h1>
      <ul class="breadcrumb al-breadcrumb"><li><a routerLink="/dashboard">Home</a></li><li>{{ activePageTitle() }}</li></ul>
    </div>
  `,
})
export class ContentTopComponent implements OnDestroy {
  readonly activePageTitle = signal('');
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly subscription: Subscription;

  constructor() {
    this.updateTitle();
    this.subscription = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => this.updateTitle());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateTitle(): void {
    let current = this.route.snapshot.root;
    let title = current.data['title'] ?? '';
    while (current.firstChild) {
      current = current.firstChild;
      if (current.data['title']) title = current.data['title'];
    }
    this.activePageTitle.set(String(title));
  }
}
