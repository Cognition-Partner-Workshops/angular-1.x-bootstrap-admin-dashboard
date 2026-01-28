import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPort, PaginatedResponse } from '../../core/ports/data.port';
import { UserRecord } from '../../core/mocks/fixtures';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  private dataPort = inject(DataPort);

  users: UserRecord[] = [];
  loading = true;
  currentPage = 1;
  totalPages = 1;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.dataPort.getList<UserRecord>('users', { page: this.currentPage, pageSize: 10 }).subscribe({
      next: (response: PaginatedResponse<UserRecord>) => {
        this.users = response.data;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load users:', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    return status === 'active' ? 'status-active' : 'status-inactive';
  }
}
