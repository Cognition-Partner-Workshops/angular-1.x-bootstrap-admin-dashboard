import { TestBed } from '@angular/core/testing';
import { TagsInputPanelComponent } from './tags-input-panel.component';

describe('TagsInputPanelComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [TagsInputPanelComponent] }).compileComponents());
  it('renders the legacy chip counts', () => {
    const fixture = TestBed.createComponent(TagsInputPanelComponent);
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('app-tags-input');
    expect(inputs.length).toBe(3);
    expect(fixture.nativeElement.querySelectorAll('.label-primary').length).toBe(5);
    expect(fixture.nativeElement.querySelectorAll('.label-warning').length).toBe(4);
    expect(fixture.nativeElement.querySelectorAll('.label-danger').length).toBe(5);
  });
});
