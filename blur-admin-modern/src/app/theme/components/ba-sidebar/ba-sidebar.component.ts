import { Component, ElementRef, HostListener, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { BaMenuItem, BaSidebarService } from './ba-sidebar.service';
import { BaUtilService } from '../../services/ba-util.service';

@Component({
  selector: 'ba-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="al-sidebar" (mouseleave)="hoverElemTop = selectElemTop">
      <ul class="al-sidebar-list" [style.height.px]="menuHeight()" style="overflow-y:auto">
        @for (item of menuItems; track item.title) {
          <li class="al-sidebar-list-item"
              [class.with-sub-menu]="!!item.subMenu"
              [class.ba-sidebar-item-expanded]="item.expanded"
              routerLinkActive="selected" [routerLinkActiveOptions]="{exact: false}">
            @if (item.subMenu) {
              <a class="al-sidebar-list-link" href="javascript:void(0)"
                 (mouseenter)="hoverItem($event)" (click)="toggleSubMenu($event, item)">
                <i [class]="item.icon"></i><span>{{ item.title }}</span>
                <b class="fa" [class.fa-angle-up]="item.expanded" [class.fa-angle-down]="!item.expanded"></b>
              </a>
              <ul class="al-sidebar-sublist" [class.slide-right]="item.slideRight">
                @for (subitem of item.subMenu; track subitem.title) {
                  <li class="ba-sidebar-sublist-item"
                      [class.with-sub-menu]="!!subitem.subMenu"
                      [class.ba-sidebar-item-expanded]="subitem.expanded"
                      routerLinkActive="selected" [routerLinkActiveOptions]="{exact: false}">
                    @if (subitem.subMenu) {
                      <a class="al-sidebar-list-link subitem-submenu-link" href="javascript:void(0)"
                         (mouseenter)="hoverItem($event)" (click)="toggleSubMenu($event, subitem)">
                        <span>{{ subitem.title }}</span>
                        <b class="fa" [class.fa-angle-up]="subitem.expanded" [class.fa-angle-down]="!subitem.expanded"></b>
                      </a>
                      <ul class="al-sidebar-sublist subitem-submenu-list"
                          [class.expanded]="subitem.expanded" [class.slide-right]="subitem.slideRight">
                        @for (leaf of subitem.subMenu; track leaf.title) {
                          <li routerLinkActive="selected" [routerLinkActiveOptions]="{exact: false}"
                              (mouseenter)="hoverItem($event)">
                            <a class="al-sidebar-list-link" [routerLink]="leaf.stateRef"
                               [href]="leaf.disabled ? 'javascript:void(0)' : null"
                               (click)="leaf.disabled && $event.preventDefault()">{{ leaf.title }}</a>
                          </li>
                        }
                      </ul>
                    } @else {
                      <a class="al-sidebar-list-link"
                         [routerLink]="subitem.disabled ? null : subitem.stateRef"
                         [href]="subitem.disabled ? 'javascript:void(0)' : (subitem.fixedHref ?? null)"
                         [target]="subitem.blank ? '_blank' : '_self'"
                         (mouseenter)="hoverItem($event)"
                         (click)="subitem.disabled && $event.preventDefault()">{{ subitem.title }}</a>
                    }
                  </li>
                }
              </ul>
            } @else {
              <a class="al-sidebar-list-link"
                 [routerLink]="item.disabled ? null : item.stateRef"
                 [href]="item.disabled ? 'javascript:void(0)' : (item.fixedHref ?? null)"
                 [target]="item.blank ? '_blank' : '_self'"
                 (mouseenter)="hoverItem($event)"
                 (click)="item.disabled && $event.preventDefault()">
                <i [class]="item.icon"></i><span>{{ item.title }}</span>
              </a>
            }
          </li>
        }
      </ul>
      <div class="sidebar-hover-elem" [style.top.px]="hoverElemTop"
           [style.height.px]="hoverElemHeight" [class.show-hover-elem]="showHoverElem"></div>
    </aside>
  `,
})
export class BaSidebarComponent implements OnInit {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly util = inject(BaUtilService);
  readonly sidebar = inject(BaSidebarService);
  readonly router = inject(Router);
  readonly menuItems = this.sidebar.getMenuItems();
  readonly menuHeight = signal(0);
  showHoverElem = false;
  hoverElemHeight = 42;
  hoverElemTop?: number;
  selectElemTop?: number;

  ngOnInit(): void {
    this.updateExpanded();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) this.updateExpanded();
    });
  }

  toggleSubMenu(event: Event, item: BaMenuItem): void {
    event.preventDefault();
    if (this.sidebar.isMenuCollapsed()) {
      this.sidebar.setMenuCollapsed(false);
      item.expanded = true;
    } else {
      item.expanded = !item.expanded;
    }
  }

  hoverItem(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    this.showHoverElem = true;
    this.hoverElemHeight = target.clientHeight;
    this.hoverElemTop = target.getBoundingClientRect().top - 66;
  }

  @HostListener('window:click', ['$event'])
  onWindowClick(event: Event & { $sidebarEventProcessed?: boolean }): void {
    if (event.$sidebarEventProcessed || this.sidebar.isMenuCollapsed()) return;
    const target = event.target as Node | null;
    if (target && !this.util.isDescendant(this.elementRef.nativeElement, target) && this.sidebar.canSidebarBeHidden()) {
      setTimeout(() => this.sidebar.setMenuCollapsed(true), 10);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.sidebar.setMenuCollapsed(this.sidebar.shouldMenuBeCollapsed());
    this.updateMenuHeight();
  }

  ngAfterViewInit(): void {
    this.updateMenuHeight();
  }

  private updateMenuHeight(): void {
    const aside = this.elementRef.nativeElement.querySelector('aside');
    if (aside) this.menuHeight.set(aside.clientHeight - 84);
  }

  private updateExpanded(): void {
    const url = this.router.url;
    const expand = (item: BaMenuItem): void => {
      item.expanded = this.sidebar.getAllStateRefsRecursive(item).some((ref) => url.startsWith(ref));
      item.subMenu?.forEach(expand);
    };
    this.menuItems.forEach(expand);
  }
}
