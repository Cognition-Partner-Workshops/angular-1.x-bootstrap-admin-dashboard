import { BaMenuItem } from './theme';

export const STATIC_MENU_ITEMS: BaMenuItem[] = [
  {
    title: 'Pages',
    icon: 'ion-document',
    subMenu: [
      { title: 'Sign In', fixedHref: 'auth.html', blank: true },
      { title: 'Sign Up', fixedHref: 'reg.html', blank: true },
      { title: 'User Profile', stateRef: '/profile' },
      { title: '404 Page', fixedHref: '404.html', blank: true },
    ],
  },
  {
    title: 'Menu Level 1',
    icon: 'ion-ios-more',
    subMenu: [
      { title: 'Menu Level 1.1', disabled: true },
      { title: 'Menu Level 1.2', subMenu: [{ title: 'Menu Level 1.2.1', disabled: true }] },
    ],
  },
];
