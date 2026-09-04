import { TestBed } from '@angular/core/testing';
import { TagsInputComponent } from './tags-input.component';

describe('TagsInputComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [TagsInputComponent] }).compileComponents());
  it('adds and removes tags', () => {
    const fixture = TestBed.createComponent(TagsInputComponent);
    fixture.componentInstance.tags.set(['One', 'Two', 'Three', 'Four', 'Five']);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.tag').length).toBe(5);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = ' New,';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: ',' }));
    fixture.detectChanges();
    expect(fixture.componentInstance.tags()).toContain('New');
    fixture.componentInstance.removeTag(0);
    expect(fixture.componentInstance.tags().length).toBe(5);
  });
});
