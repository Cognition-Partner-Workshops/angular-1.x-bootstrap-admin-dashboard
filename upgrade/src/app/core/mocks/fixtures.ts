export interface DashboardStats {
  id: string;
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
}

export const MOCK_DATA: Record<string, unknown[]> = {
  'dashboard-stats': [
    { id: 'stat-1', label: 'Total Users', value: 1250, change: 12.5, changeType: 'increase' },
    { id: 'stat-2', label: 'Active Sessions', value: 342, change: 8.2, changeType: 'increase' },
    { id: 'stat-3', label: 'Revenue', value: 45230, change: -2.1, changeType: 'decrease' },
    { id: 'stat-4', label: 'Conversion Rate', value: 3.2, change: 0, changeType: 'neutral' }
  ] as DashboardStats[],

  users: [
    { id: 'user-1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', createdAt: '2024-01-15T10:30:00Z' },
    { id: 'user-2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', createdAt: '2024-02-20T14:45:00Z' },
    { id: 'user-3', name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'inactive', createdAt: '2024-03-10T09:15:00Z' },
    { id: 'user-4', name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'active', createdAt: '2024-04-05T16:20:00Z' },
    { id: 'user-5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin', status: 'active', createdAt: '2024-05-12T11:00:00Z' }
  ] as UserRecord[],

  notifications: [
    { id: 'notif-1', title: 'New User Registered', message: 'A new user has registered on the platform.', type: 'info', read: false, createdAt: '2024-06-01T08:00:00Z' },
    { id: 'notif-2', title: 'System Update', message: 'System maintenance scheduled for tonight.', type: 'warning', read: true, createdAt: '2024-06-01T07:30:00Z' },
    { id: 'notif-3', title: 'Payment Failed', message: 'A payment transaction has failed.', type: 'error', read: false, createdAt: '2024-06-01T06:45:00Z' },
    { id: 'notif-4', title: 'Report Generated', message: 'Your monthly report is ready for download.', type: 'success', read: true, createdAt: '2024-05-31T18:00:00Z' }
  ] as Notification[],

  activities: [
    { id: 'act-1', userId: 'user-1', userName: 'John Doe', action: 'created', target: 'New Project', timestamp: '2024-06-01T10:30:00Z' },
    { id: 'act-2', userId: 'user-2', userName: 'Jane Smith', action: 'updated', target: 'User Settings', timestamp: '2024-06-01T09:45:00Z' },
    { id: 'act-3', userId: 'user-3', userName: 'Bob Wilson', action: 'deleted', target: 'Old Report', timestamp: '2024-06-01T08:20:00Z' },
    { id: 'act-4', userId: 'user-4', userName: 'Alice Brown', action: 'viewed', target: 'Dashboard', timestamp: '2024-06-01T07:15:00Z' },
    { id: 'act-5', userId: 'user-5', userName: 'Charlie Davis', action: 'exported', target: 'Analytics Data', timestamp: '2024-05-31T16:30:00Z' }
  ] as Activity[]
};
