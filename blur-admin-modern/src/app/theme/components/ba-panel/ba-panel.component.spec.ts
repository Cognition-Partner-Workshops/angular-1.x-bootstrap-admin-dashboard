import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BaPanelComponent } from './ba-panel.component';

@Component({
  standalone: true,
  imports: [BaPanelComponent],
  template: '<ba-panel title="Title" baPanelClass="custom" [blur]="true"><span>Content</span></ba-panel>',
})
class PanelHost {}

describe('BaPanelComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [PanelHost] }));

  it('creates', () => expect(TestBed.createComponent(PanelHost)).toBeTruthy());

  it('renders title, projected content, custom class, and blur state', () => {
    const fixture = TestBed.createComponent(PanelHost);
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('.panel') as HTMLElement;
    expect(panel.querySelector('.panel-heading')).toBeTruthy();
    expect(panel.textContent).toContain('Title');
    expect(panel.textContent).toContain('Content');
    expect(panel.classList).toContain('custom');
    expect(panel.classList).toContain('panel-blur');
  });
});
