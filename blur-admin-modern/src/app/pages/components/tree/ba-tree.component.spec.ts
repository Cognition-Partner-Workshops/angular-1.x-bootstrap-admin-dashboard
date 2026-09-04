import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaTreeComponent } from './ba-tree.component';
import { getDefaultData } from './tree-node';

describe('BaTreeComponent', () => {
  let fixture: ComponentFixture<BaTreeComponent>;
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [BaTreeComponent] }).compileComponents(); fixture = TestBed.createComponent(BaTreeComponent); fixture.componentInstance.nodes = getDefaultData(); fixture.detectChanges(); });
  it('renders nested nodes and custom icons', () => { expect(fixture.nativeElement.textContent).toContain('Node 1'); expect(fixture.nativeElement.textContent).toContain('Node 3.2.1'); expect(fixture.nativeElement.querySelector('.ion-help-buoy')).toBeTruthy(); });
  it('selects a node', () => { const spy = jasmine.createSpy('selected'); fixture.componentInstance.selectedChange.subscribe(spy); (fixture.nativeElement.querySelector('.tree-node') as HTMLElement).click(); expect(spy).toHaveBeenCalled(); });
});
