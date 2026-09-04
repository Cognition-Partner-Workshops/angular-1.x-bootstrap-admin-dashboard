import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { BaPanelComponent, KameleonImgPipe } from '../../../theme';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [BaPanelComponent, KameleonImgPipe],
  templateUrl: './timeline.component.html',
})
export class TimelineComponent implements AfterViewInit {
  @ViewChildren('block', { read: ElementRef }) blocks!: QueryList<ElementRef<HTMLElement>>;
  private animationFrame?: number;
  private readonly offset = 0.8;

  ngAfterViewInit(): void {
    this.hideBlocks();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.animationFrame !== undefined) return;
    const callback = () => {
      this.animationFrame = undefined;
      this.showBlocks();
    };
    if (window.requestAnimationFrame) this.animationFrame = window.requestAnimationFrame(callback);
    else setTimeout(callback, 100);
  }

  private hideBlocks(): void {
    const threshold = window.scrollY + window.innerHeight * this.offset;
    this.blocks.forEach((block) => {
      if (block.nativeElement.getBoundingClientRect().top + window.scrollY > threshold) {
        block.nativeElement.querySelectorAll('.cd-timeline-img, .cd-timeline-content').forEach((element) => element.classList.add('is-hidden'));
      }
    });
  }

  private showBlocks(): void {
    const threshold = window.scrollY + window.innerHeight * this.offset;
    this.blocks.forEach((block) => {
      const image = block.nativeElement.querySelector('.cd-timeline-img');
      if (block.nativeElement.getBoundingClientRect().top + window.scrollY <= threshold && image?.classList.contains('is-hidden')) {
        block.nativeElement.querySelectorAll('.cd-timeline-img, .cd-timeline-content').forEach((element) => {
          element.classList.remove('is-hidden');
          element.classList.add('bounce-in');
        });
      }
    });
  }
}
