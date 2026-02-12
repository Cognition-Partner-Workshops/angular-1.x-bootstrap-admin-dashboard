import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TreeComponent } from './tree.component';
import { provideRouter } from '@angular/router';

describe('TreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Route Reachability', () => {
    it('should render tree view page', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const compiled = fixture.nativeElement as HTMLElement;
      const container = compiled.querySelector('[data-testid="tree-view-page"]');
      expect(container).toBeTruthy();
    }));

    it('should render basic tree panel', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const compiled = fixture.nativeElement as HTMLElement;
      const basicTree = compiled.querySelector('[data-testid="basic-tree"]');
      expect(basicTree).toBeTruthy();
    }));

    it('should render drag and drop tree panel', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const compiled = fixture.nativeElement as HTMLElement;
      const dragTree = compiled.querySelector('[data-testid="drag-tree"]');
      expect(dragTree).toBeTruthy();
    }));
  });

  describe('Tree Data Structure - Parity with Legacy', () => {
    it('should have correct basic tree data structure matching legacy', () => {
      const rootNodes = component.getRootNodes(component.basicTreeData);
      expect(rootNodes.length).toBe(3);
      expect(rootNodes[0].text).toBe('Node 1');
      expect(rootNodes[1].text).toBe('Node 2');
      expect(rootNodes[2].text).toBe('Node 3');
    });

    it('should have correct drag tree data structure matching legacy', () => {
      const rootNodes = component.getRootNodes(component.dragTreeData);
      expect(rootNodes.length).toBe(4);
      expect(rootNodes[0].text).toBe('Node 1');
      expect(rootNodes[1].text).toBe('Node 2');
      expect(rootNodes[2].text).toBe('Node 3');
      expect(rootNodes[3].text).toBe('Node 4');
    });

    it('should have child nodes for Node 1 in basic tree', () => {
      const children = component.getChildNodes(component.basicTreeData, 'n1');
      expect(children.length).toBe(4);
      expect(children[0].text).toBe('Node 1.1');
      expect(children[1].text).toBe('Node 1.2');
      expect(children[2].text).toBe('Node 1.3');
      expect(children[3].text).toBe('Node 1.4');
    });

    it('should have nested children for Node 3.2 in basic tree', () => {
      const children = component.getChildNodes(component.basicTreeData, 'n13');
      expect(children.length).toBe(2);
      expect(children[0].text).toBe('Node 3.2.1');
      expect(children[1].text).toBe('Node 3.2.2');
    });

    it('should have custom icon for Node 2.2 matching legacy', () => {
      const node = component.basicTreeData.find(n => n.id === 'n10');
      expect(node).toBeTruthy();
      expect(node?.icon).toBe('ion-help-buoy');
      expect(node?.text).toBe('Node 2.2 (Custom icon)');
    });
  });

  describe('Tree Expand/Collapse', () => {
    it('should collapse all nodes when collapseAll is called', () => {
      component.collapseAll();
      const allClosed = component.basicTreeData.every(node => !node.state.opened);
      expect(allClosed).toBe(true);
    });

    it('should expand all nodes when expandAll is called', () => {
      component.collapseAll();
      component.expandAll();
      const allOpened = component.basicTreeData.every(node => node.state.opened);
      expect(allOpened).toBe(true);
    });

    it('should toggle individual node state', () => {
      const nodeId = 'n1';
      const initialState = component.basicTreeData.find(n => n.id === nodeId)?.state.opened;
      component.onNodeToggle(nodeId);
      const newState = component.basicTreeData.find(n => n.id === nodeId)?.state.opened;
      expect(newState).toBe(!initialState);
    });

    it('should render collapse all button', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const compiled = fixture.nativeElement as HTMLElement;
      const collapseBtn = compiled.querySelector('[data-testid="tree-collapse-btn"]');
      expect(collapseBtn).toBeTruthy();
      expect(collapseBtn?.textContent?.trim()).toBe('Collapse All');
    }));

    it('should render expand all button', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const compiled = fixture.nativeElement as HTMLElement;
      const expandBtn = compiled.querySelector('[data-testid="tree-expand-btn"]');
      expect(expandBtn).toBeTruthy();
      expect(expandBtn?.textContent?.trim()).toBe('Expand All');
    }));
  });

  describe('Tree Node Selection', () => {
    it('should select node when onNodeSelect is called', () => {
      expect(component.selectedNodeId).toBeNull();
      component.onNodeSelect('n1');
      expect(component.selectedNodeId).toBe('n1');
    });

    it('should change selection when different node is selected', () => {
      component.onNodeSelect('n1');
      expect(component.selectedNodeId).toBe('n1');
      component.onNodeSelect('n2');
      expect(component.selectedNodeId).toBe('n2');
    });

    it('should render tree nodes with correct test ids', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const compiled = fixture.nativeElement as HTMLElement;
      const node1 = compiled.querySelector('[data-testid="tree-node-n1"]');
      const node2 = compiled.querySelector('[data-testid="tree-node-n2"]');
      const node3 = compiled.querySelector('[data-testid="tree-node-n3"]');
      expect(node1).toBeTruthy();
      expect(node2).toBeTruthy();
      expect(node3).toBeTruthy();
    }));
  });

  describe('Add New Node', () => {
    it('should not add node when no node is selected', () => {
      const initialLength = component.basicTreeData.length;
      component.addNewNode();
      expect(component.basicTreeData.length).toBe(initialLength);
    });

    it('should add new node under selected node', () => {
      const initialLength = component.basicTreeData.length;
      component.onNodeSelect('n1');
      component.addNewNode();
      expect(component.basicTreeData.length).toBe(initialLength + 1);
      const newNode = component.basicTreeData[component.basicTreeData.length - 1];
      expect(newNode.parent).toBe('n1');
      expect(newNode.text).toContain('New node');
    });

    it('should render add button', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const compiled = fixture.nativeElement as HTMLElement;
      const addBtn = compiled.querySelector('[data-testid="tree-add-btn"]');
      expect(addBtn).toBeTruthy();
      expect(addBtn?.textContent?.trim()).toBe('Add');
    }));
  });

  describe('Refresh', () => {
    it('should reset tree data to default when refresh is called', () => {
      component.onNodeSelect('n1');
      component.addNewNode();
      const lengthAfterAdd = component.basicTreeData.length;
      
      component.refresh();
      
      expect(component.basicTreeData.length).toBeLessThan(lengthAfterAdd);
      expect(component.selectedNodeId).toBeNull();
    });

    it('should render refresh button', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const compiled = fixture.nativeElement as HTMLElement;
      const refreshBtn = compiled.querySelector('[data-testid="tree-refresh-btn"]');
      expect(refreshBtn).toBeTruthy();
      expect(refreshBtn?.textContent?.trim()).toBe('Refresh');
    }));
  });

  describe('Drag and Drop Tree', () => {
    it('should select node in drag tree', () => {
      expect(component.dragSelectedNodeId).toBeNull();
      component.onDragNodeSelect('nd1');
      expect(component.dragSelectedNodeId).toBe('nd1');
    });

    it('should toggle node in drag tree', () => {
      const nodeId = 'nd1';
      const initialState = component.dragTreeData.find(n => n.id === nodeId)?.state.opened;
      component.onDragNodeToggle(nodeId);
      const newState = component.dragTreeData.find(n => n.id === nodeId)?.state.opened;
      expect(newState).toBe(!initialState);
    });

    it('should move node on drag drop', () => {
      const draggedNode = component.dragTreeData.find(n => n.id === 'nd5');
      expect(draggedNode?.parent).toBe('nd1');
      
      component.onDragDrop({ draggedId: 'nd5', targetId: 'nd2' });
      
      const movedNode = component.dragTreeData.find(n => n.id === 'nd5');
      expect(movedNode?.parent).toBe('nd2');
    });

    it('should not move node to itself', () => {
      const originalParent = component.dragTreeData.find(n => n.id === 'nd5')?.parent;
      component.onDragDrop({ draggedId: 'nd5', targetId: 'nd5' });
      const afterParent = component.dragTreeData.find(n => n.id === 'nd5')?.parent;
      expect(afterParent).toBe(originalParent);
    });

    it('should not move parent node into its own child', () => {
      const originalParent = component.dragTreeData.find(n => n.id === 'nd1')?.parent;
      component.onDragDrop({ draggedId: 'nd1', targetId: 'nd5' });
      const afterParent = component.dragTreeData.find(n => n.id === 'nd1')?.parent;
      expect(afterParent).toBe(originalParent);
    });
  });

  describe('Control Buttons Layout - Parity with Legacy', () => {
    it('should have all four control buttons', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const compiled = fixture.nativeElement as HTMLElement;
      const addBtn = compiled.querySelector('[data-testid="tree-add-btn"]');
      const collapseBtn = compiled.querySelector('[data-testid="tree-collapse-btn"]');
      const expandBtn = compiled.querySelector('[data-testid="tree-expand-btn"]');
      const refreshBtn = compiled.querySelector('[data-testid="tree-refresh-btn"]');
      
      expect(addBtn).toBeTruthy();
      expect(collapseBtn).toBeTruthy();
      expect(expandBtn).toBeTruthy();
      expect(refreshBtn).toBeTruthy();
    }));

    it('should have buttons with btn-primary class', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('.btn.btn-primary');
      expect(buttons.length).toBeGreaterThanOrEqual(4);
    }));
  });
});
