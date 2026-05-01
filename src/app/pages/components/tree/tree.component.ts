import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../../theme/components/panel/panel.component';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule, PanelComponent],
  templateUrl: './tree.component.html',
})
export class TreeComponent {
  expandedNodes: Record<string, boolean> = {};

  toggleNode(nodeId: string): void {
    this.expandedNodes[nodeId] = !this.expandedNodes[nodeId];
  }
}
