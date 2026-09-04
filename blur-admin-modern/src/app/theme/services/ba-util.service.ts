import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaUtilService {
  isDescendant(parent: Node, child: Node): boolean {
    let node: Node | null = child.parentNode;
    while (node) {
      if (node === parent) return true;
      node = node.parentNode;
    }
    return false;
  }

  hexToRGB(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  hasAttr(elem: Element, attrName: string): boolean {
    return elem.hasAttribute(attrName);
  }
}
