import { Component, input } from '@angular/core';

@Component({
  selector: 'app-content-top',
  standalone: true,
  template: `
    <div class="content-top">
      <h1>{{ pageTitle() }}</h1>
    </div>
  `,
})
export class ContentTopComponent {
  pageTitle = input('');
}
