import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkNestedTreeNode, CdkTreeModule } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TreeNode } from './tree-node';

@Component({
  selector: 'ba-tree',
  standalone: true,
  imports: [CdkTreeModule, CdkNestedTreeNode, CdkDrag, CdkDropList],
  template: `
    <div id="tree-root" cdkDropList (cdkDropListDropped)="drop($event)">
      <cdk-tree [dataSource]="roots" [childrenAccessor]="childrenAccessor">
        <cdk-nested-tree-node *cdkTreeNodeDef="let node" cdkDrag [cdkDragDisabled]="!draggable"
                              [isExpanded]="node.state.opened">
          <div class="tree-node" [class.selected]="selectedId === node.id" (click)="select(node)">
            @if (hasChildren(node)) {
              <button type="button" class="control" (click)="toggle(node); $event.stopPropagation()">
                <i [class]="node.state.opened ? 'ion-chevron-down' : 'ion-chevron-right'"></i>
              </button>
            } @else {
              <span class="control"></span>
            }
            <i [class]="node.icon ?? (node.type === 'folder' ? 'ion-ios-folder' : 'ion-document-text')"></i>
            <span>{{ node.text }}</span>
          </div>
          @if (node.state.opened) {
            <div class="tree-children"><ng-container cdkTreeNodeOutlet></ng-container></div>
          }
        </cdk-nested-tree-node>
      </cdk-tree>
    </div>
  `,
})
export class BaTreeComponent implements OnChanges {
  private _nodes: TreeNode[] = [];
  private readonly childNodes = new Map<string, BehaviorSubject<TreeNode[]>>();
  @Input()
  get nodes(): TreeNode[] {
    return this._nodes;
  }
  set nodes(value: TreeNode[]) {
    this._nodes = value;
    this.updateRoots();
  }
  @Input() selectable = true;
  @Input() draggable = false;
  @Output() readonly selectedChange = new EventEmitter<string | null>();
  selectedId: string | null = null;
  roots: TreeNode[] = [];

  readonly childrenAccessor = (node: TreeNode): Observable<TreeNode[]> => this.childrenFor(node.id).asObservable();

  ngOnChanges(): void {
    this.updateRoots();
  }

  hasChildren(node: TreeNode): boolean {
    return this.nodes.some((child) => child.parent === node.id);
  }

  toggle(node: TreeNode): void {
    node.state.opened = !node.state.opened;
  }

  select(node: TreeNode): void {
    if (!this.selectable) return;
    this.selectedId = node.id;
    this.selectedChange.emit(node.id);
  }

  drop(event: CdkDragDrop<TreeNode[]>): void {
    if (!this.draggable || event.previousIndex === event.currentIndex) return;
    const visible = this.visibleNodes();
    const dragged = visible[event.previousIndex];
    const target = visible[event.currentIndex];
    if (!dragged) return;
    const reordered = [...this.nodes];
    const oldIndex = reordered.indexOf(dragged);
    if (oldIndex >= 0) moveItemInArray(reordered, oldIndex, Math.min(event.currentIndex, reordered.length - 1));
    if (target && target !== dragged) dragged.parent = target.parent;
    this.nodes = reordered;
    this.updateRoots();
  }

  private visibleNodes(): TreeNode[] {
    const output: TreeNode[] = [];
    const visit = (items: TreeNode[]) => items.forEach((item) => {
      output.push(item);
      if (item.state.opened) visit(this.nodes.filter((child) => child.parent === item.id));
    });
    visit(this.roots);
    return output;
  }

  private updateRoots(): void {
    this.roots = this.nodes.filter((node) => node.parent === '#');
    const childrenByParent = new Map<string, TreeNode[]>();
    this.nodes.forEach((node) => {
      if (node.parent !== '#') {
        const children = childrenByParent.get(node.parent) ?? [];
        children.push(node);
        childrenByParent.set(node.parent, children);
      }
    });
    this.childNodes.forEach((subject, parent) => subject.next(childrenByParent.get(parent) ?? []));
    childrenByParent.forEach((children, parent) => this.childrenFor(parent).next(children));
  }

  private childrenFor(parent: string): BehaviorSubject<TreeNode[]> {
    let subject = this.childNodes.get(parent);
    if (!subject) {
      subject = new BehaviorSubject<TreeNode[]>(this.nodes.filter((node) => node.parent === parent));
      this.childNodes.set(parent, subject);
    }
    return subject;
  }
}
