import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content-top',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="content-top clearfix">
      <h1 class="al-title">{{ activePageTitle }}</h1>
      <ul class="breadcrumb al-breadcrumb">
        <li><a routerLink="/dashboard">Home</a></li>
        <li class="active">{{ activePageTitle }}</li>
      </ul>
    </div>
  `,
})
export class ContentTopComponent {
  activePageTitle = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          return child?.snapshot.data?.['title'] ?? '';
        })
      )
      .subscribe((title: string) => {
        this.activePageTitle = title;
      });
  }
}
