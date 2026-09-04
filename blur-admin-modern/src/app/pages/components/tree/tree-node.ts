export interface TreeNode {
  id: string;
  parent: string;
  text: string;
  type?: 'folder';
  icon?: string;
  state: { opened: boolean };
}

const node = (id: string, parent: string, text: string, type?: 'folder', icon?: string): TreeNode => ({
  id, parent, text, ...(type ? { type } : {}), ...(icon ? { icon } : {}), state: { opened: true },
});

export function getDefaultData(): TreeNode[] {
  return [
    node('n1', '#', 'Node 1', 'folder'), node('n2', '#', 'Node 2', 'folder'), node('n3', '#', 'Node 3', 'folder'),
    node('n5', 'n1', 'Node 1.1'), node('n6', 'n1', 'Node 1.2'), node('n7', 'n1', 'Node 1.3'), node('n8', 'n1', 'Node 1.4'),
    node('n9', 'n2', 'Node 2.1'), node('n10', 'n2', 'Node 2.2 (Custom icon)', undefined, 'ion-help-buoy'),
    node('n12', 'n3', 'Node 3.1'), node('n13', 'n3', 'Node 3.2', 'folder'), node('n14', 'n13', 'Node 3.2.1'),
    node('n15', 'n13', 'Node 3.2.2'), node('n16', 'n3', 'Node 3.3'), node('n17', 'n3', 'Node 3.4'),
    node('n18', 'n3', 'Node 3.5'), node('n19', 'n3', 'Node 3.6'),
  ];
}

export const DRAG_DATA: TreeNode[] = [
  node('nd1', '#', 'Node 1', 'folder'), node('nd2', '#', 'Node 2', 'folder'), node('nd3', '#', 'Node 3', 'folder'), node('nd4', '#', 'Node 4', 'folder'),
  node('nd5', 'nd1', 'Node 1.1'), node('nd6', 'nd1', 'Node 1.2'), node('nd7', 'nd1', 'Node 1.3'),
  node('nd8', 'nd2', 'Node 2.1'), node('nd9', 'nd2', 'Node 2.2'), node('nd10', 'nd2', 'Node 2.3'),
  node('nd11', 'nd3', 'Node 3.1'), node('nd12', 'nd3', 'Node 3.2'), node('nd13', 'nd3', 'Node 3.3'),
  node('nd14', 'nd4', 'Node 4.1'), node('nd15', 'nd4', 'Node 4.2'), node('nd16', 'nd4', 'Node 4.3'),
];
