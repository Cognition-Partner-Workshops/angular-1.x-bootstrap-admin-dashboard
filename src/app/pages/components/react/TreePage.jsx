import React, { useState, useRef } from 'react';
import Panel from './Panel';

function getDefaultData() {
  return [
    { id: 'n1', parent: '#', type: 'folder', text: 'Node 1', opened: true },
    { id: 'n2', parent: '#', type: 'folder', text: 'Node 2', opened: true },
    { id: 'n3', parent: '#', type: 'folder', text: 'Node 3', opened: true },
    { id: 'n5', parent: 'n1', type: 'default', text: 'Node 1.1', opened: true },
    { id: 'n6', parent: 'n1', type: 'default', text: 'Node 1.2', opened: true },
    { id: 'n7', parent: 'n1', type: 'default', text: 'Node 1.3', opened: true },
    { id: 'n8', parent: 'n1', type: 'default', text: 'Node 1.4', opened: true },
    { id: 'n9', parent: 'n2', type: 'default', text: 'Node 2.1', opened: true },
    { id: 'n10', parent: 'n2', type: 'default', text: 'Node 2.2 (Custom icon)', opened: true },
    { id: 'n12', parent: 'n3', type: 'default', text: 'Node 3.1', opened: true },
    { id: 'n13', parent: 'n3', type: 'folder', text: 'Node 3.2', opened: true },
    { id: 'n14', parent: 'n13', type: 'default', text: 'Node 3.2.1', opened: true },
    { id: 'n15', parent: 'n13', type: 'default', text: 'Node 3.2.2', opened: true },
    { id: 'n16', parent: 'n3', type: 'default', text: 'Node 3.3', opened: true },
    { id: 'n17', parent: 'n3', type: 'default', text: 'Node 3.4', opened: true },
    { id: 'n18', parent: 'n3', type: 'default', text: 'Node 3.5', opened: true },
    { id: 'n19', parent: 'n3', type: 'default', text: 'Node 3.6', opened: true }
  ];
}

function getDragData() {
  return [
    { id: 'nd1', parent: '#', type: 'folder', text: 'Node 1', opened: true },
    { id: 'nd2', parent: '#', type: 'folder', text: 'Node 2', opened: true },
    { id: 'nd3', parent: '#', type: 'folder', text: 'Node 3', opened: true },
    { id: 'nd4', parent: '#', type: 'folder', text: 'Node 4', opened: true },
    { id: 'nd5', parent: 'nd1', type: 'default', text: 'Node 1.1', opened: true },
    { id: 'nd6', parent: 'nd1', type: 'default', text: 'Node 1.2', opened: true },
    { id: 'nd7', parent: 'nd1', type: 'default', text: 'Node 1.3', opened: true },
    { id: 'nd8', parent: 'nd2', type: 'default', text: 'Node 2.1', opened: true },
    { id: 'nd9', parent: 'nd2', type: 'default', text: 'Node 2.2', opened: true },
    { id: 'nd10', parent: 'nd2', type: 'default', text: 'Node 2.3', opened: true },
    { id: 'nd11', parent: 'nd3', type: 'default', text: 'Node 3.1', opened: true },
    { id: 'nd12', parent: 'nd3', type: 'default', text: 'Node 3.2', opened: true },
    { id: 'nd13', parent: 'nd3', type: 'default', text: 'Node 3.3', opened: true },
    { id: 'nd14', parent: 'nd4', type: 'default', text: 'Node 4.1', opened: true },
    { id: 'nd15', parent: 'nd4', type: 'default', text: 'Node 4.2', opened: true },
    { id: 'nd16', parent: 'nd4', type: 'default', text: 'Node 4.3', opened: true }
  ];
}

function TreeNode({ node, nodes, selected, onSelect, level }) {
  var children = nodes.filter(function (n) { return n.parent === node.id; });
  var isFolder = node.type === 'folder';
  var iconClass = isFolder ? 'ion-ios-folder' : 'ion-document-text';
  if (node.id === 'n10') iconClass = 'ion-help-buoy';
  var isSelected = selected === node.id;

  return (
    <div style={{ paddingLeft: level * 18 + 'px' }}>
      <div
        className={'tree-node' + (isSelected ? ' selected' : '')}
        onClick={function () { onSelect(node.id); }}
        style={{ cursor: 'pointer', padding: '3px 5px' }}
      >
        {isFolder && node.opened && children.length > 0 && <i className="ion-arrow-down-b" style={{ marginRight: 4 }}></i>}
        {isFolder && !node.opened && children.length > 0 && <i className="ion-arrow-right-b" style={{ marginRight: 4 }}></i>}
        <i className={iconClass} style={{ marginRight: 6 }}></i>
        <span>{node.text}</span>
      </div>
      {node.opened && children.map(function (child) {
        return <TreeNode key={child.id} node={child} nodes={nodes} selected={selected} onSelect={onSelect} level={level + 1} />;
      })}
    </div>
  );
}

function TreeView({ data, onSelect, selected }) {
  var roots = data.filter(function (n) { return n.parent === '#'; });
  return (
    <div className="jstree-container">
      {roots.map(function (root) {
        return <TreeNode key={root.id} node={root} nodes={data} selected={selected} onSelect={onSelect} level={0} />;
      })}
    </div>
  );
}

function TreePage() {
  var [treeData, setTreeData] = useState(getDefaultData);
  var [dragData] = useState(getDragData);
  var [selected, setSelected] = useState(null);
  var newIdCounterRef = useRef(0);

  function addNewNode() {
    if (!selected) return;
    newIdCounterRef.current++;
    var newId = 'new_' + newIdCounterRef.current;
    setTreeData(function (prev) {
      return prev.concat([{ id: newId, parent: selected, type: 'default', text: 'New node ' + newIdCounterRef.current, opened: true }]);
    });
  }

  function collapseAll() {
    setTreeData(function (prev) {
      return prev.map(function (n) { return Object.assign({}, n, { opened: false }); });
    });
  }

  function expandAll() {
    setTreeData(function (prev) {
      return prev.map(function (n) { return Object.assign({}, n, { opened: true }); });
    });
  }

  function refresh() {
    newIdCounterRef.current = 0;
    setTreeData(getDefaultData());
    setSelected(null);
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <Panel title="Basic Action" className="with-scroll tree-panel">
          <div className="row">
            <div className="col-sm-4">
              <div className="control-side text-center">
                <div><button className="btn btn-primary" onClick={addNewNode}>Add</button></div>
                <div><button className="btn btn-primary" onClick={collapseAll}>Collapse All</button></div>
                <div><button className="btn btn-primary" onClick={expandAll}>Expand All</button></div>
                <div><button className="btn btn-primary" onClick={refresh}>Refresh</button></div>
              </div>
            </div>
            <div className="col-sm-8">
              <TreeView data={treeData} selected={selected} onSelect={setSelected} />
            </div>
          </div>
        </Panel>
      </div>
      <div className="col-md-6">
        <Panel title="Drag &amp; Drop" className="with-scroll tree-panel">
          <TreeView data={dragData} selected={null} onSelect={function () {}} />
        </Panel>
      </div>
    </div>
  );
}

export default TreePage;
