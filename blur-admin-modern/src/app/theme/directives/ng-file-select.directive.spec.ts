import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgFileSelectDirective } from './ng-file-select.directive';

@Component({
  standalone: true,
  imports: [NgFileSelectDirective],
  template: '<input type="file" ngFileSelect (fileSelect)="selected = $event">',
})
class NgFileSelectHost {
  selected?: File;
}

describe('NgFileSelectDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [NgFileSelectHost] }));

  it('creates', () => expect(TestBed.createComponent(NgFileSelectHost)).toBeTruthy());

  it('emits the first selected file', () => {
    const fixture = TestBed.createComponent(NgFileSelectHost);
    fixture.detectChanges();
    const file = new File(['content'], 'test.txt');
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    Object.defineProperty(input, 'files', { configurable: true, value: [file] });
    input.dispatchEvent(new Event('change'));
    expect(fixture.componentInstance.selected).toBe(file);
  });
});
