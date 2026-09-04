import { Component, signal } from '@angular/core';
import { BaPanelComponent } from '../../../theme';
import { BaTreeComponent } from './ba-tree.component';
import { DRAG_DATA, getDefaultData, TreeNode } from './tree-node';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [BaPanelComponent, BaTreeComponent],
  templateUrl: './tree.component.html',
})
export class TreeComponent {
  readonly treeData = signal<TreeNode[]>(getDefaultData());
  dragData: TreeNode[] = DRAG_DATA.map((item) => ({ ...item, state: { ...item.state } }));
  selected: string | null = null;
  private newId = 0;

  addNewNode(): void {
    if (!this.selected) return;
    const id = String(this.newId++);
    this.treeData.update((nodes) => [...nodes, { id, parent: this.selected!, text: 'New node ' + this.newId, state: { opened: true } }]);
  }

  refresh(): void {
    this.newId = 0;
    this.selected = null;
    this.treeData.set(getDefaultData());
  }

  expand(): void {
    this.treeData.set(this.treeData().map((node) => ({ ...node, state: { opened: true } })));
  }

  collapse(): void {
    this.treeData.set(this.treeData().map((node) => ({ ...node, state: { opened: false } })));
  }
}
