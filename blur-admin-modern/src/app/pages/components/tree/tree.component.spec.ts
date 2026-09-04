import { TestBed } from '@angular/core/testing';
import { TreeComponent } from './tree.component';

describe('TreeComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [TreeComponent] }).compileComponents());
  it('adds only after selection and refreshes', () => {
    const fixture = TestBed.createComponent(TreeComponent);
    fixture.detectChanges();
    fixture.componentInstance.addNewNode();
    expect(fixture.componentInstance.treeData().some((node) => node.text === 'New node 1')).toBeFalse();
    fixture.componentInstance.selected = 'n1';
    fixture.componentInstance.addNewNode();
    expect(fixture.componentInstance.treeData().some((node) => node.text === 'New node 1')).toBeTrue();
    fixture.componentInstance.collapse();
    expect(fixture.componentInstance.treeData().every((node) => !node.state.opened)).toBeTrue();
    fixture.componentInstance.expand();
    expect(fixture.componentInstance.treeData().every((node) => node.state.opened)).toBeTrue();
    fixture.componentInstance.refresh();
    expect(fixture.componentInstance.treeData().some((node) => node.text === 'New node 1')).toBeFalse();
  });
});
