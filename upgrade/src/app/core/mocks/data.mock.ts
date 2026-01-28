import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { DataPort, QueryOptions, PaginatedResponse } from '../ports/data.port';
import { MOCK_DATA } from './fixtures';

@Injectable({ providedIn: 'root' })
export class MockDataService extends DataPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get<T>(endpoint: string, options?: QueryOptions): Observable<T> {
    const data = this.getDataForEndpoint(endpoint);
    return of(data as T).pipe(delay(200));
  }

  getList<T>(endpoint: string, options?: QueryOptions): Observable<PaginatedResponse<T>> {
    const allData = this.getDataForEndpoint(endpoint) as T[];
    const page = options?.page ?? 1;
    const pageSize = options?.pageSize ?? 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const filteredData = [...allData];

    if (options?.sortBy) {
      filteredData.sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[options.sortBy!];
        const bVal = (b as Record<string, unknown>)[options.sortBy!];
        const comparison = String(aVal).localeCompare(String(bVal));
        return options.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    const paginatedData = filteredData.slice(startIndex, endIndex);

    const response: PaginatedResponse<T> = {
      data: paginatedData,
      total: filteredData.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredData.length / pageSize)
    };

    return of(response).pipe(delay(300));
  }

  create<T>(endpoint: string, data: Partial<T>): Observable<T> {
    const newItem = {
      id: 'new-' + Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    } as T;
    return of(newItem).pipe(delay(300));
  }

  update<T>(endpoint: string, id: string, data: Partial<T>): Observable<T> {
    const updatedItem = {
      id,
      ...data,
      updatedAt: new Date().toISOString()
    } as T;
    return of(updatedItem).pipe(delay(300));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(endpoint: string, id: string): Observable<void> {
    return of(undefined).pipe(delay(200));
  }

  private getDataForEndpoint(endpoint: string): unknown {
    const normalizedEndpoint = endpoint.replace(/^\//, '').split('/')[0];
    return MOCK_DATA[normalizedEndpoint] ?? [];
  }
}
