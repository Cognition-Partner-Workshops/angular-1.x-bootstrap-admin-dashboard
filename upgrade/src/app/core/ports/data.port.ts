import { Observable } from 'rxjs';

export interface QueryOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export abstract class DataPort {
  abstract get<T>(endpoint: string, options?: QueryOptions): Observable<T>;
  abstract getList<T>(endpoint: string, options?: QueryOptions): Observable<PaginatedResponse<T>>;
  abstract create<T>(endpoint: string, data: Partial<T>): Observable<T>;
  abstract update<T>(endpoint: string, id: string, data: Partial<T>): Observable<T>;
  abstract delete(endpoint: string, id: string): Observable<void>;
}
