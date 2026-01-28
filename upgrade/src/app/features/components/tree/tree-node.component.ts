import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from './tree.component';

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tree-node-container" role="tree">
      @for (node of nodes; track node.id) {
        <div class="tree-node-wrapper" role="treeitem" [attr.aria-selected]="node.id === selectedNodeId">
          <div
            class="tree-node"
            [class.selected]="node.id === selectedNodeId"
            [class.has-children]="hasChildren(node.id)"
            [attr.data-testid]="'tree-node-' + node.id"
            [attr.aria-selected]="node.id === selectedNodeId"
            [attr.aria-expanded]="hasChildren(node.id) ? node.state.opened : null"
            [draggable]="draggable"
            tabindex="0"
            (click)="onSelect(node)"
            (keydown.enter)="onSelect(node)"
            (keydown.space)="onSelect(node); $event.preventDefault()"
            (dragstart)="onDragStart($event, node)"
            (dragover)="onDragOver($event)"
            (drop)="onDrop($event, node)"
          >
            @if (hasChildren(node.id)) {
              <button
                type="button"
                class="control"
                [attr.data-testid]="'tree-toggle-' + node.id"
                [attr.aria-label]="node.state.opened ? 'Collapse ' + node.text : 'Expand ' + node.text"
                (click)="onToggle($event, node)"
              >
                <i [class]="node.state.opened ? 'ion-arrow-down-b' : 'ion-arrow-right-b'"></i>
              </button>
            } @else {
              <span class="control-spacer"></span>
            }
            <span class="node-icon">
              <i [class]="getNodeIcon(node)"></i>
            </span>
            <span class="node-text">{{ node.text }}</span>
          </div>
          @if (node.state.opened && hasChildren(node.id)) {
            <div class="tree-children" role="group">
              <app-tree-node
                [nodes]="getChildren(node.id)"
                [allNodes]="allNodes"
                [selectedNodeId]="selectedNodeId"
                [draggable]="draggable"
                (nodeSelect)="nodeSelect.emit($event)"
                (nodeToggle)="nodeToggle.emit($event)"
                (nodeDrop)="nodeDrop.emit($event)"
              ></app-tree-node>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .tree-node-container {
      padding-left: 0;
    }

    .tree-node-wrapper {
      margin: 0;
    }

    .tree-node {
      display: flex;
      align-items: center;
      padding: 4px 8px;
      cursor: pointer;
      line-height: 25px;
      border-radius: 3px;
      transition: background-color 0.15s ease;
    }

    .tree-node:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }

    .tree-node.selected {
      background-color: rgba(0, 0, 0, 0.25);
    }

    .control {
      cursor: pointer;
      font-size: 12px;
      width: 16px;
      text-align: center;
      margin-right: 4px;
      background: none;
      border: none;
      padding: 0;
      color: inherit;
    }

    .control-spacer {
      width: 16px;
      margin-right: 4px;
    }

    .node-icon {
      margin-right: 6px;
      font-size: 14px;
    }

    .node-text {
      flex: 1;
    }

    .tree-children {
      padding-left: 20px;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      margin-left: 8px;
    }
  `]
})
export class TreeNodeComponent {
  @Input() nodes: TreeNode[] = [];
  @Input() allNodes: TreeNode[] = [];
  @Input() selectedNodeId: string | null = null;
  @Input() draggable = false;

  @Output() nodeSelect = new EventEmitter<string>();
  @Output() nodeToggle = new EventEmitter<string>();
  @Output() nodeDrop = new EventEmitter<{ draggedId: string; targetId: string }>();

  private draggedNodeId: string | null = null;

  hasChildren(nodeId: string): boolean {
    return this.allNodes.some(n => n.parent === nodeId);
  }

  getChildren(nodeId: string): TreeNode[] {
    return this.allNodes.filter(n => n.parent === nodeId);
  }

  getNodeIcon(node: TreeNode): string {
    if (node.icon) {
      return node.icon;
    }
    return node.type === 'folder' ? 'ion-ios-folder' : 'ion-document-text';
  }

  onSelect(node: TreeNode): void {
    this.nodeSelect.emit(node.id);
  }

  onToggle(event: Event, node: TreeNode): void {
    event.stopPropagation();
    this.nodeToggle.emit(node.id);
  }

  onDragStart(event: DragEvent, node: TreeNode): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', node.id);
      event.dataTransfer.effectAllowed = 'move';
    }
    this.draggedNodeId = node.id;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  onDrop(event: DragEvent, targetNode: TreeNode): void {
    event.preventDefault();
    event.stopPropagation();
    const draggedId = event.dataTransfer?.getData('text/plain');
    if (draggedId && draggedId !== targetNode.id) {
      this.nodeDrop.emit({ draggedId, targetId: targetNode.id });
    }
  }
}
