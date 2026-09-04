import { Routes } from '@angular/router';
import { MailComponent } from './mail/mail.component';
import { MailDetailComponent } from './mail/mail-detail/mail-detail.component';
import { MailListComponent } from './mail/mail-list/mail-list.component';
import { MailTabService } from './mail/mail-tab.service';
import { TimelineComponent } from './timeline/timeline.component';
import { TreeComponent } from './tree/tree.component';

export const COMPONENTS_ROUTES: Routes = [
  {
    path: 'mail',
    component: MailComponent,
    providers: [MailTabService],
    data: { title: 'Mail', sidebarMeta: { order: 0 } },
    children: [
      { path: '', redirectTo: 'inbox', pathMatch: 'full' },
      { path: ':label', component: MailListComponent, data: { title: 'Mail' } },
      { path: ':label/:id', component: MailDetailComponent, data: { title: 'Mail' } },
    ],
  },
  { path: 'timeline', component: TimelineComponent, data: { title: 'Timeline', sidebarMeta: { icon: 'ion-ios-pulse', order: 100 } } },
  { path: 'tree', component: TreeComponent, data: { title: 'Tree View', sidebarMeta: { order: 200 } } },
];
