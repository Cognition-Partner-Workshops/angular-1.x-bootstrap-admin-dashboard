import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-content-top',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './content-top.component.html',
  styleUrl: './content-top.component.scss',
})
export class ContentTopComponent {
  activePageTitle = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => {
          let route = this.router.routerState.root;
          let title = '';
          while (route.firstChild) {
            route = route.firstChild;
            if (route.snapshot.data['title']) {
              title = route.snapshot.data['title'];
            }
          }
          return title;
        })
      )
      .subscribe((title) => {
        this.activePageTitle = title;
      });
  }
}
