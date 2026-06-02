import React, { useEffect, useRef, useCallback } from 'react';
import { Panel } from '../components/Panel';

function getDefaultData() {
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
    { id: 'n19', parent: 'n3', text: 'Node 3.6', state: { opened: true } },
  ];
}

var dragData = [
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
  { id: 'nd16', parent: 'nd4', text: 'Node 4.3', state: { opened: true } },
];

var typeConfig = {
  folder: { icon: 'ion-ios-folder' },
  'default': { icon: 'ion-document-text' },
};

export function TreeViewPage() {
  var basicTreeRef = useRef(null);
  var dragTreeRef = useRef(null);
  var newIdRef = useRef(0);

  useEffect(function () {
    var $ = window.jQuery;

    if (basicTreeRef.current) {
      basicTreeRef.current.setAttribute('js-tree', 'basicConfig');
      $(basicTreeRef.current).jstree({
        core: {
          data: getDefaultData(),
          multiple: false,
          check_callback: true,
          worker: true,
        },
        types: typeConfig,
        plugins: ['types'],
      });
    }

    if (dragTreeRef.current) {
      dragTreeRef.current.setAttribute('js-tree', 'dragConfig');
      $(dragTreeRef.current).jstree({
        core: {
          data: dragData,
          check_callback: true,
          themes: { responsive: false },
        },
        types: typeConfig,
        plugins: ['dnd', 'types'],
      });
    }

    return function () {
      if (basicTreeRef.current && $.jstree && $(basicTreeRef.current).jstree(true)) {
        $(basicTreeRef.current).jstree('destroy');
      }
      if (dragTreeRef.current && $.jstree && $(dragTreeRef.current).jstree(true)) {
        $(dragTreeRef.current).jstree('destroy');
      }
    };
  }, []);

  var addNewNode = useCallback(function () {
    var $ = window.jQuery;
    var inst = $(basicTreeRef.current).jstree(true);
    var selected = inst.get_selected()[0];
    if (selected) {
      var id = (newIdRef.current++).toString();
      inst.create_node(selected, { id: id, text: 'New node ' + (newIdRef.current), state: { opened: true } });
    }
  }, []);

  var collapseAll = useCallback(function () {
    var $ = window.jQuery;
    $(basicTreeRef.current).jstree(true).close_all();
  }, []);

  var expandAll = useCallback(function () {
    var $ = window.jQuery;
    $(basicTreeRef.current).jstree(true).open_all();
  }, []);

  var refresh = useCallback(function () {
    var $ = window.jQuery;
    var inst = $(basicTreeRef.current).jstree(true);
    newIdRef.current = 0;
    inst.settings.core.data = getDefaultData();
    inst.refresh();
  }, []);

  return React.createElement('div', { className: 'row' },
    React.createElement('div', { className: 'col-md-6' },
      React.createElement(Panel, { title: 'Basic Action', panelClass: 'with-scroll tree-panel' },
        React.createElement('div', { className: 'row' },
          React.createElement('div', { className: 'col-sm-4' },
            React.createElement('div', { className: 'control-side text-center' },
              React.createElement('div', null,
                React.createElement('button', { className: 'btn btn-primary', onClick: addNewNode }, 'Add')
              ),
              React.createElement('div', null,
                React.createElement('button', { className: 'btn btn-primary', onClick: collapseAll }, 'Collapse All')
              ),
              React.createElement('div', null,
                React.createElement('button', { className: 'btn btn-primary', onClick: expandAll }, 'Expand All')
              ),
              React.createElement('div', null,
                React.createElement('button', { className: 'btn btn-primary', onClick: refresh }, 'Refresh')
              )
            )
          ),
          React.createElement('div', { className: 'col-sm-8' },
            React.createElement('div', { ref: basicTreeRef })
          )
        )
      )
    ),
    React.createElement('div', { className: 'col-md-6' },
      React.createElement(Panel, { title: 'Drag & Drop', panelClass: 'with-scroll tree-panel' },
        React.createElement('div', { ref: dragTreeRef })
      )
    )
  );
}
