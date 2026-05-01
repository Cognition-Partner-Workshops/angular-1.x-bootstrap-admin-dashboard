import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (showButton) {
      <a class="back-to-top" (click)="scrollToTop()">
        <i class="fa fa-angle-up"></i>
      </a>
    }
  `,
  styles: [`
    .back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #209e91;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 18px;
      z-index: 1000;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      transition: background 0.2s;

      &:hover {
        background: #1a8679;
      }
    }
  `],
})
export class BackTopComponent {
  showButton = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.showButton = window.scrollY > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
