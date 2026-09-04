import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComposeBoxComponent } from './compose-box.component';

describe('ComposeBoxComponent', () => {
  let fixture: ComponentFixture<ComposeBoxComponent>;
  const active = { dismiss: jasmine.createSpy('dismiss') };
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ComposeBoxComponent], providers: [{ provide: NgbActiveModal, useValue: active }] }).compileComponents();
    fixture = TestBed.createComponent(ComposeBoxComponent);
    fixture.detectChanges();
  });
  it('renders the compose fields', () => {
    expect(fixture.nativeElement.textContent).toContain('New message');
    expect(fixture.nativeElement.querySelector('input[placeholder="To"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('quill-editor')).toBeTruthy();
  });
  it('dismisses from the close icon', () => { (fixture.nativeElement.querySelector('.ion-close-round') as HTMLElement).click(); expect(active.dismiss).toHaveBeenCalled(); });
});
