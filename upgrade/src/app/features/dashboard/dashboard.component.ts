import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPort, PaginatedResponse } from '../../core/ports/data.port';
import { DashboardStats, Activity } from '../../core/mocks/fixtures';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private dataPort = inject(DataPort);

  stats: DashboardStats[] = [];
  activities: Activity[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.dataPort.get<DashboardStats[]>('dashboard-stats').subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => console.error('Failed to load stats:', err)
    });

    this.dataPort.getList<Activity>('activities', { pageSize: 5 }).subscribe({
      next: (response: PaginatedResponse<Activity>) => {
        this.activities = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load activities:', err);
        this.loading = false;
      }
    });
  }

  getChangeClass(changeType: string): string {
    switch (changeType) {
      case 'increase': return 'change-positive';
      case 'decrease': return 'change-negative';
      default: return 'change-neutral';
    }
  }
}
