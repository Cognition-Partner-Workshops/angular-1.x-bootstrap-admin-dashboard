import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkNestedTreeNode, CdkTreeModule } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
              <button type="button" class="control" cdkTreeNodeToggle (click)="toggle(node); $event.stopPropagation()">
                <i [class]="node.state.opened ? 'ion-chevron-down' : 'ion-chevron-right'"></i>
              </button>
            } @else {
              <span class="control"></span>
            }
            <i [class]="node.icon ?? (node.type === 'folder' ? 'ion-ios-folder' : 'ion-document-text')"></i>
            <span>{{ node.text }}</span>
          </div>
          <div class="tree-children"><ng-container cdkTreeNodeOutlet></ng-container></div>
        </cdk-nested-tree-node>
      </cdk-tree>
    </div>
  `,
})
export class BaTreeComponent {
  @Input() nodes: TreeNode[] = [];
  @Input() selectable = true;
  @Input() draggable = false;
  @Output() readonly selectedChange = new EventEmitter<string | null>();
  selectedId: string | null = null;

  readonly childrenAccessor = (node: TreeNode): TreeNode[] => this.nodes.filter((child) => child.parent === node.id);

  get roots(): TreeNode[] {
    return this.nodes.filter((node) => node.parent === '#');
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
  }

  private visibleNodes(): TreeNode[] {
    const output: TreeNode[] = [];
    const visit = (items: TreeNode[]) => items.forEach((item) => {
      output.push(item);
      if (item.state.opened) visit(this.childrenAccessor(item));
    });
    visit(this.roots);
    return output;
  }
}
