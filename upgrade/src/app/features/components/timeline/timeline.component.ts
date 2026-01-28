import {
  Component,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PageContainerComponent } from '../../../shared/components';

export interface TimelineItem {
  id: number;
  icon: string;
  colorVariant: 'warning' | 'danger' | 'primary';
  title: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, PageContainerComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnDestroy, AfterViewInit {
  @ViewChildren('timelineBlock') timelineBlocks!: QueryList<ElementRef>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly offset = 0.8;
  private scrollHandler: (() => void) | null = null;
  private isBrowser = isPlatformBrowser(this.platformId);

  timelineItems: TimelineItem[] = [
    {
      id: 1,
      icon: 'Euro-Coin',
      colorVariant: 'warning',
      title: 'Title of section 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.',
      date: 'Jan 14'
    },
    {
      id: 2,
      icon: 'Laptop-Signal',
      colorVariant: 'danger',
      title: 'Title of section 2',
      description: 'Donec dapibus at leo eget volutpat. Praesent dolor tellus, ultricies venenatis molestie eu, luctus eget nibh. Curabitur ullamcorper eleifend nisl.',
      date: 'Jan 18'
    },
    {
      id: 3,
      icon: 'Checklist',
      colorVariant: 'primary',
      title: 'Title of section 3',
      description: 'Phasellus auctor tellus eget lacinia condimentum. Cum sociis natoque penatibus et magnis dis parturient montes.',
      date: 'Feb 18'
    },
    {
      id: 4,
      icon: 'Boss-3',
      colorVariant: 'warning',
      title: 'Title of section 4',
      description: 'Morbi fringilla in massa ac posuere. Fusce non sagittis massa, id accumsan odio. Nullam eget tempor est. Etiam eu felis eu purus aliquam tristique id quis nisl. Nam eros nibh, consequat sed pulvinar eu, ultrices ornare ligula. Aenean interdum sed nunc sed hendrerit.',
      date: 'Feb 20'
    },
    {
      id: 5,
      icon: 'Online-Shopping',
      colorVariant: 'danger',
      title: 'Title of section 5',
      description: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur eget mattis metus. Nullam egestas eros metus, quis fringilla urna accumsan sed. Aliquam ultrices at arcu vitae tincidunt.',
      date: 'Feb 21'
    },
    {
      id: 6,
      icon: 'Money-Increase',
      colorVariant: 'primary',
      title: 'Title of section 6',
      description: 'Praesent bibendum ante mattis augue consectetur, ut commodo turpis consequat. Donec ligula eros, porta in iaculis vel, semper ac sem. Integer at mauris lorem.',
      date: 'Feb 23'
    },
    {
      id: 7,
      icon: 'Vector',
      colorVariant: 'warning',
      title: 'Title of section 7',
      description: 'Vivamus ut laoreet erat, vitae eleifend eros. Sed varius id tellus non lobortis. Sed dolor ante, cursus non scelerisque sed, euismod id eros.',
      date: 'Feb 24'
    }
  ];


  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.hideBlocks();
        this.setupScrollListener();
      }, 0);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  getIconPath(iconName: string): string {
    return `assets/img/theme/icon/kameleon/${iconName}.svg`;
  }

  private hideBlocks(): void {
    if (!this.timelineBlocks) return;

    this.timelineBlocks.forEach((blockRef) => {
      const block = blockRef.nativeElement as HTMLElement;
      const blockTop = block.getBoundingClientRect().top + window.scrollY;
      const viewportThreshold = window.scrollY + window.innerHeight * this.offset;

      if (blockTop > viewportThreshold) {
        const img = block.querySelector('.cd-timeline-img');
        const content = block.querySelector('.cd-timeline-content');
        if (img) img.classList.add('is-hidden');
        if (content) content.classList.add('is-hidden');
      }
    });
  }

  private showBlocks(): void {
    if (!this.timelineBlocks) return;

    this.timelineBlocks.forEach((blockRef) => {
      const block = blockRef.nativeElement as HTMLElement;
      const blockTop = block.getBoundingClientRect().top + window.scrollY;
      const viewportThreshold = window.scrollY + window.innerHeight * this.offset;
      const img = block.querySelector('.cd-timeline-img');
      const content = block.querySelector('.cd-timeline-content');

      if (blockTop <= viewportThreshold && img?.classList.contains('is-hidden')) {
        if (img) {
          img.classList.remove('is-hidden');
          img.classList.add('bounce-in');
        }
        if (content) {
          content.classList.remove('is-hidden');
          content.classList.add('bounce-in');
        }
      }
    });
  }

  private setupScrollListener(): void {
    this.scrollHandler = () => {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => this.showBlocks());
      } else {
        setTimeout(() => this.showBlocks(), 100);
      }
    };

    window.addEventListener('scroll', this.scrollHandler);
  }
}
