import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../../shared/components';
import { TreeNodeComponent } from './tree-node.component';

export interface TreeNode {
  id: string;
  parent: string;
  text: string;
  type?: 'folder' | 'default';
  icon?: string;
  state: {
    opened: boolean;
  };
}

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule, BaPanelComponent, TreeNodeComponent],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss'
})
export class TreeComponent {
  private newId = 0;
  selectedNodeId: string | null = null;
  dragSelectedNodeId: string | null = null;

  basicTreeData: TreeNode[] = this.getDefaultBasicData();
  dragTreeData: TreeNode[] = this.getDefaultDragData();

  addNewNode(): void {
    if (this.selectedNodeId) {
      const newNode: TreeNode = {
        id: `new-${this.newId++}`,
        parent: this.selectedNodeId,
        text: `New node ${this.newId}`,
        type: 'default',
        state: { opened: true }
      };
      this.basicTreeData = [...this.basicTreeData, newNode];
      const parentNode = this.basicTreeData.find(n => n.id === this.selectedNodeId);
      if (parentNode) {
        parentNode.state.opened = true;
      }
    }
  }

  collapseAll(): void {
    this.basicTreeData = this.basicTreeData.map(node => ({
      ...node,
      state: { ...node.state, opened: false }
    }));
  }

  expandAll(): void {
    this.basicTreeData = this.basicTreeData.map(node => ({
      ...node,
      state: { ...node.state, opened: true }
    }));
  }

  refresh(): void {
    this.newId = 0;
    this.selectedNodeId = null;
    this.basicTreeData = this.getDefaultBasicData();
  }

  onNodeSelect(nodeId: string): void {
    this.selectedNodeId = nodeId;
  }

  onDragNodeSelect(nodeId: string): void {
    this.dragSelectedNodeId = nodeId;
  }

  onNodeToggle(nodeId: string): void {
    this.basicTreeData = this.basicTreeData.map(node => {
      if (node.id === nodeId) {
        return { ...node, state: { ...node.state, opened: !node.state.opened } };
      }
      return node;
    });
  }

  onDragNodeToggle(nodeId: string): void {
    this.dragTreeData = this.dragTreeData.map(node => {
      if (node.id === nodeId) {
        return { ...node, state: { ...node.state, opened: !node.state.opened } };
      }
      return node;
    });
  }

  onDragDrop(event: { draggedId: string; targetId: string }): void {
    const draggedNode = this.dragTreeData.find(n => n.id === event.draggedId);
    if (draggedNode && event.draggedId !== event.targetId) {
      const isDescendant = this.isDescendantOf(event.targetId, event.draggedId);
      if (!isDescendant) {
        this.dragTreeData = this.dragTreeData.map(node => {
          if (node.id === event.draggedId) {
            return { ...node, parent: event.targetId };
          }
          return node;
        });
      }
    }
  }

  private isDescendantOf(nodeId: string, potentialAncestorId: string): boolean {
    const node = this.dragTreeData.find(n => n.id === nodeId);
    if (!node || node.parent === '#') return false;
    if (node.parent === potentialAncestorId) return true;
    return this.isDescendantOf(node.parent, potentialAncestorId);
  }

  getRootNodes(data: TreeNode[]): TreeNode[] {
    return data.filter(node => node.parent === '#');
  }

  getChildNodes(data: TreeNode[], parentId: string): TreeNode[] {
    return data.filter(node => node.parent === parentId);
  }

  private getDefaultBasicData(): TreeNode[] {
    return [
      { id: 'n1', parent: '#', type: 'folder', text: 'Node 1', state: { opened: true } },
      { id: 'n2', parent: '#', type: 'folder', text: 'Node 2', state: { opened: true } },
      { id: 'n3', parent: '#', type: 'folder', text: 'Node 3', state: { opened: true } },
      { id: 'n5', parent: 'n1', text: 'Node 1.1', state: { opened: true } },
      { id: 'n6', parent: 'n1', text: 'Node 1.2', state: { opened: true } },
      { id: 'n7', parent: 'n1', text: 'Node 1.3', state: { opened: true } },
      { id: 'n8', parent: 'n1', text: 'Node 1.4', state: { opened: true } },
      { id: 'n9', parent: 'n2', text: 'Node 2.1', state: { opened: true } },
      { id: 'n10', parent: 'n2', text: 'Node 2.2 (Custom icon)', icon: 'ion-help-buoy', state: { opened: true } },
      { id: 'n12', parent: 'n3', text: 'Node 3.1', state: { opened: true } },
      { id: 'n13', parent: 'n3', type: 'folder', text: 'Node 3.2', state: { opened: true } },
      { id: 'n14', parent: 'n13', text: 'Node 3.2.1', state: { opened: true } },
      { id: 'n15', parent: 'n13', text: 'Node 3.2.2', state: { opened: true } },
      { id: 'n16', parent: 'n3', text: 'Node 3.3', state: { opened: true } },
      { id: 'n17', parent: 'n3', text: 'Node 3.4', state: { opened: true } },
      { id: 'n18', parent: 'n3', text: 'Node 3.5', state: { opened: true } },
      { id: 'n19', parent: 'n3', text: 'Node 3.6', state: { opened: true } }
    ];
  }

  private getDefaultDragData(): TreeNode[] {
    return [
      { id: 'nd1', parent: '#', type: 'folder', text: 'Node 1', state: { opened: true } },
      { id: 'nd2', parent: '#', type: 'folder', text: 'Node 2', state: { opened: true } },
      { id: 'nd3', parent: '#', type: 'folder', text: 'Node 3', state: { opened: true } },
      { id: 'nd4', parent: '#', type: 'folder', text: 'Node 4', state: { opened: true } },
      { id: 'nd5', parent: 'nd1', text: 'Node 1.1', state: { opened: true } },
      { id: 'nd6', parent: 'nd1', text: 'Node 1.2', state: { opened: true } },
      { id: 'nd7', parent: 'nd1', text: 'Node 1.3', state: { opened: true } },
      { id: 'nd8', parent: 'nd2', text: 'Node 2.1', state: { opened: true } },
      { id: 'nd9', parent: 'nd2', text: 'Node 2.2', state: { opened: true } },
      { id: 'nd10', parent: 'nd2', text: 'Node 2.3', state: { opened: true } },
      { id: 'nd11', parent: 'nd3', text: 'Node 3.1', state: { opened: true } },
      { id: 'nd12', parent: 'nd3', text: 'Node 3.2', state: { opened: true } },
      { id: 'nd13', parent: 'nd3', text: 'Node 3.3', state: { opened: true } },
      { id: 'nd14', parent: 'nd4', text: 'Node 4.1', state: { opened: true } },
      { id: 'nd15', parent: 'nd4', text: 'Node 4.2', state: { opened: true } },
      { id: 'nd16', parent: 'nd4', text: 'Node 4.3', state: { opened: true } }
    ];
  }
}
