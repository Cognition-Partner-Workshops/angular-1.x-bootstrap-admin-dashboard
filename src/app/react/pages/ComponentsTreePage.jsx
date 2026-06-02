/**
 * ComponentsTreePage — React migration of the AngularJS tree view page
 * (src/app/pages/components/tree).
 *
 * Renders two jsTree instances ("Basic Action" and "Drag & Drop") by
 * initialising the global jQuery jsTree plugin against container divs in a
 * useEffect. The container divs keep the original `js-tree` attribute so the
 * theme styles and E2E selectors continue to match. The Add / Collapse All /
 * Expand All / Refresh buttons drive the basic tree through the jsTree API.
 */
import React, { useEffect, useRef, useCallback } from 'react';
import { Panel } from '../components/Panel';

var BASIC_CONFIG = {
  core: {
    multiple: false,
    check_callback: true,
    worker: true,
  },
  types: {
    folder: { icon: 'ion-ios-folder' },
    default: { icon: 'ion-document-text' },
  },
  plugins: ['types'],
};

var DRAG_CONFIG = {
  core: {
    check_callback: true,
    themes: { responsive: false },
  },
  types: {
    folder: { icon: 'ion-ios-folder' },
    default: { icon: 'ion-document-text' },
  },
  plugins: ['dnd', 'types'],
};

function getBasicData() {
  return [
    { id: 'n1', parent: '#', type: 'folder', text: 'Node 1', state: { opened: true } },
    { id: 'n2', parent: '#', type: 'folder', text: 'Node 2', state: { opened: true } },
    { id: 'n3', parent: '#', type: 'folder', text: 'Node 3', state: { opened: true } },
    { id: 'n4', parent: 'n1', text: 'Node 1.1', state: { opened: true } },
    { id: 'n5', parent: 'n1', text: 'Node 1.2', state: { opened: true } },
    { id: 'n6', parent: 'n1', text: 'Node 1.3', state: { opened: true } },
    { id: 'n7', parent: 'n2', text: 'Node 2.1', state: { opened: true } },
    { id: 'n8', parent: 'n2', text: 'Node 2.2', state: { opened: true } },
    { id: 'n9', parent: 'n2', text: 'Node 2.3', state: { opened: true } },
    { id: 'n10', parent: 'n3', text: 'Node 3.1', state: { opened: true } },
    { id: 'n11', parent: 'n3', text: 'Node 3.2', state: { opened: true } },
    { id: 'n12', parent: 'n3', text: 'Node 3.3', state: { opened: true } },
  ];
}

function getDragData() {
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
    { id: 'nd16', parent: 'nd4', text: 'Node 4.3', state: { opened: true } },
  ];
}

export function ComponentsTreePage() {
  var basicRef = useRef(null);
  var dragRef = useRef(null);
  var newIdRef = useRef(0);

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !$.jstree) {
      return undefined;
    }

    $.jstree.defaults.core.themes.url = true;
    $.jstree.defaults.core.themes.dir = 'assets/img/theme/vendor/jstree/dist/themes';

    var $basic = $(basicRef.current);
    var $drag = $(dragRef.current);

    $basic.jstree({
      core: Object.assign({}, BASIC_CONFIG.core, { data: getBasicData() }),
      types: BASIC_CONFIG.types,
      plugins: BASIC_CONFIG.plugins,
    });

    $drag.jstree({
      core: Object.assign({}, DRAG_CONFIG.core, { data: getDragData() }),
      types: DRAG_CONFIG.types,
      plugins: DRAG_CONFIG.plugins,
    });

    return function () {
      $basic.jstree('destroy');
      $drag.jstree('destroy');
    };
  }, []);

  var addNewNode = useCallback(function () {
    var $ = window.jQuery;
    var inst = $(basicRef.current).jstree(true);
    var selected = inst.get_selected()[0];
    if (selected) {
      newIdRef.current += 1;
      inst.create_node(selected, { text: 'New node ' + newIdRef.current, state: { opened: true } });
      inst.open_node(selected);
    }
  }, []);

  var collapse = useCallback(function () {
    window.jQuery(basicRef.current).jstree('close_all');
  }, []);

  var expand = useCallback(function () {
    window.jQuery(basicRef.current).jstree('open_all');
  }, []);

  var refresh = useCallback(function () {
    var $ = window.jQuery;
    var inst = $(basicRef.current).jstree(true);
    newIdRef.current = 0;
    inst.settings.core.data = getBasicData();
    inst.refresh();
  }, []);

  return React.createElement(
    'div',
    { className: 'row' },
    React.createElement(
      'div',
      { className: 'col-md-6' },
      React.createElement(
        Panel,
        { title: 'Basic Action', panelClass: 'with-scroll tree-panel' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-sm-4' },
            React.createElement(
              'div',
              { className: 'control-side text-center' },
              React.createElement('div', null,
                React.createElement('button', { className: 'btn btn-primary', onClick: addNewNode }, 'Add')),
              React.createElement('div', null,
                React.createElement('button', { className: 'btn btn-primary', onClick: collapse }, 'Collapse All')),
              React.createElement('div', null,
                React.createElement('button', { className: 'btn btn-primary', onClick: expand }, 'Expand All')),
              React.createElement('div', null,
                React.createElement('button', { className: 'btn btn-primary', onClick: refresh }, 'Refresh'))
            )
          ),
          React.createElement(
            'div',
            { className: 'col-sm-8' },
            React.createElement('div', { 'js-tree': 'basicConfig', ref: basicRef })
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'col-md-6' },
      React.createElement(
        Panel,
        { title: 'Drag & Drop', panelClass: 'with-scroll tree-panel' },
        React.createElement('div', { 'js-tree': 'dragConfig', ref: dragRef })
      )
    )
  );
}
