import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SidebarComponent } from '../../components/sidebar';
import { HeaderComponent } from '../../components/header';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  sidebarCollapsed = false;
  private destroy$ = new Subject<void>();
  private navigationService = inject(NavigationService);

  ngOnInit(): void {
    this.navigationService.getState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.sidebarCollapsed = state.collapsed;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
