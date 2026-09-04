import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StPaginationComponent } from './st-pagination.component';

@Component({
  standalone: true,
  imports: [StPaginationComponent],
  template: '<st-pagination [(page)]="page" [totalItems]="30" [pageSize]="10" />',
})
class PaginationHost {
  page = 1;
}

describe('StPaginationComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [PaginationHost] }).compileComponents());

  it('renders pages and updates the model with clamping', () => {
    const fixture = TestBed.createComponent(PaginationHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.page-item').length).toBe(7);
    (fixture.nativeElement.querySelectorAll('.page-link')[2] as HTMLElement).click();
    expect(fixture.componentInstance.page).toBe(1);
    (fixture.nativeElement.querySelectorAll('.page-link')[3] as HTMLElement).click();
    expect(fixture.componentInstance.page).toBe(2);
  });

  it('hides itself for one page', () => {
    const fixture = TestBed.createComponent(StPaginationComponent);
    fixture.componentRef.setInput('totalItems', 5);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.pagination')).toBeNull();
  });
});
