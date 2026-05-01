import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

interface TreeNode {
  name: string;
  icon?: string;
  expanded?: boolean;
  children?: TreeNode[];
}

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule, BaPanelComponent],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
})
export class TreeComponent {
  treeData: TreeNode[] = [
    {
      name: 'Root Node 1',
      icon: 'fa fa-folder',
      expanded: true,
      children: [
        { name: 'Child Node 1.1', icon: 'fa fa-file-text-o' },
        {
          name: 'Child Node 1.2',
          icon: 'fa fa-folder',
          expanded: false,
          children: [
            { name: 'Grandchild 1.2.1', icon: 'fa fa-file-text-o' },
            { name: 'Grandchild 1.2.2', icon: 'fa fa-file-text-o' },
          ],
        },
        { name: 'Child Node 1.3', icon: 'fa fa-file-text-o' },
      ],
    },
    {
      name: 'Root Node 2',
      icon: 'fa fa-folder',
      expanded: false,
      children: [
        { name: 'Child Node 2.1', icon: 'fa fa-file-text-o' },
        { name: 'Child Node 2.2', icon: 'fa fa-file-text-o' },
      ],
    },
    {
      name: 'Root Node 3',
      icon: 'fa fa-folder',
      children: [
        { name: 'Child Node 3.1', icon: 'fa fa-file-text-o' },
      ],
    },
  ];

  toggleNode(node: TreeNode): void {
    if (node.children) {
      node.expanded = !node.expanded;
    }
  }
}
