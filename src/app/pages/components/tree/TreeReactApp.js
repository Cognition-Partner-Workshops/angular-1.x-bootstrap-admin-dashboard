(function() {
  'use strict';

  var h = React.createElement;

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
      { id: 'n19', parent: 'n3', text: 'Node 3.6', state: { opened: true } }
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
    { id: 'nd16', parent: 'nd4', text: 'Node 4.3', state: { opened: true } }
  ];

  function JsTreeWidget(props) {
    var containerRef = React.useRef(null);
    var treeRef = React.useRef(null);

    React.useEffect(function() {
      if (!containerRef.current || !window.$ || !window.$.jstree) return;

      var config = Object.assign({}, props.config, {
        core: Object.assign({}, props.config.core, {
          data: props.data
        })
      });

      var $el = $(containerRef.current);
      $el.jstree(config);
      treeRef.current = $el;

      if (props.onReady) {
        $el.on('ready.jstree', props.onReady);
      }

      return function() {
        if (treeRef.current) {
          treeRef.current.jstree('destroy');
        }
      };
    }, []);

    React.useEffect(function() {
      if (treeRef.current && props.version !== undefined) {
        var inst = treeRef.current.jstree(true);
        if (inst) {
          inst.settings.core.data = props.data;
          inst.refresh();
        }
      }
    }, [props.version]);

    if (props.treeRef) {
      props.treeRef.current = treeRef;
    }

    return h('div', { ref: containerRef });
  }

  function TreeApp() {
    var _s = React.useState;
    var treeDataState = _s(getDefaultData());
    var treeData = treeDataState[0];
    var setTreeData = treeDataState[1];
    var versionState = _s(1);
    var version = versionState[0];
    var setVersion = versionState[1];
    var basicTreeRef = React.useRef(null);
    var newIdRef = React.useRef(0);

    var basicConfig = {
      core: { multiple: false, check_callback: true, worker: true },
      types: {
        folder: { icon: 'ion-ios-folder' },
        'default': { icon: 'ion-document-text' }
      },
      plugins: ['types']
    };

    var dragConfig = {
      core: { check_callback: true, themes: { responsive: false } },
      types: {
        folder: { icon: 'ion-ios-folder' },
        'default': { icon: 'ion-document-text' }
      },
      plugins: ['dnd', 'types']
    };

    function addNewNode() {
      if (!basicTreeRef.current || !basicTreeRef.current.current) return;
      var inst = basicTreeRef.current.current.jstree(true);
      if (!inst) return;
      var selected = inst.get_selected()[0];
      if (selected) {
        newIdRef.current++;
        var newData = treeData.concat([{
          id: newIdRef.current.toString(),
          parent: selected,
          text: 'New node ' + newIdRef.current,
          state: { opened: true }
        }]);
        setTreeData(newData);
        setVersion(function(v) { return v + 1; });
      }
    }

    function collapseAll() {
      if (!basicTreeRef.current || !basicTreeRef.current.current) return;
      var inst = basicTreeRef.current.current.jstree(true);
      if (inst) { inst.close_all(); }
    }

    function expandAll() {
      if (!basicTreeRef.current || !basicTreeRef.current.current) return;
      var inst = basicTreeRef.current.current.jstree(true);
      if (inst) { inst.open_all(); }
    }

    function refresh() {
      newIdRef.current = 0;
      setTreeData(getDefaultData());
      setVersion(function(v) { return v + 1; });
    }

    return h('div', { className: 'row' },
      h('div', { className: 'col-md-6' },
        h('div', { className: 'panel panel-default tree-panel' },
          h('div', { className: 'panel-heading' },
            h('span', null, 'Basic Action')
          ),
          h('div', { className: 'panel-body' },
            h('div', { className: 'row' },
              h('div', { className: 'col-sm-4' },
                h('div', { className: 'control-side text-center' },
                  h('div', null, h('button', { className: 'btn btn-primary', onClick: addNewNode }, 'Add')),
                  h('div', null, h('button', { className: 'btn btn-primary', onClick: collapseAll }, 'Collapse All')),
                  h('div', null, h('button', { className: 'btn btn-primary', onClick: expandAll }, 'Expand All')),
                  h('div', null, h('button', { className: 'btn btn-primary', onClick: refresh }, 'Refresh'))
                )
              ),
              h('div', { className: 'col-sm-8' },
                h(JsTreeWidget, {
                  config: basicConfig,
                  data: treeData,
                  version: version,
                  treeRef: basicTreeRef
                })
              )
            )
          )
        )
      ),
      h('div', { className: 'col-md-6' },
        h('div', { className: 'panel panel-default tree-panel' },
          h('div', { className: 'panel-heading' },
            h('span', null, 'Drag & Drop')
          ),
          h('div', { className: 'panel-body' },
            h(JsTreeWidget, {
              config: dragConfig,
              data: dragData
            })
          )
        )
      )
    );
  }

  var mountEl = null;
  window.mountTreeReact = function(element) {
    mountEl = element;
    ReactDOM.render(h(TreeApp), element);
  };
  window.unmountTreeReact = function() {
    if (mountEl) {
      ReactDOM.unmountComponentAtNode(mountEl);
      mountEl = null;
    }
  };
})();
