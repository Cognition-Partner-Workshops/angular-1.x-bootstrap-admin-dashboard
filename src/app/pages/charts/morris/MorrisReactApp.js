(function () {
  'use strict';

  var h = React.createElement;
  var useEffect = React.useEffect;
  var useRef = React.useRef;

  function Panel(props) {
    return h('div', { className: 'panel ' + (props.panelClass || '') },
      h('div', { className: 'panel-heading clearfix' },
        h('h3', { className: 'panel-title' }, props.title)
      ),
      h('div', { className: 'panel-body' }, props.children)
    );
  }

  function MorrisLineChart(props) {
    var ref = useRef(null);
    useEffect(function () {
      if (!ref.current || !window.Morris) return;
      var chart = new Morris.Line({
        element: ref.current,
        data: props.data,
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Serie A', 'Serie B'],
        lineColors: props.colors
      });
      return function () { if (ref.current) ref.current.innerHTML = ''; };
    }, []);
    return h('div', { ref: ref });
  }

  function MorrisDonutChart(props) {
    var ref = useRef(null);
    useEffect(function () {
      if (!ref.current || !window.Morris) return;
      var chart = new Morris.Donut({
        element: ref.current,
        data: props.data,
        colors: props.colors,
        formatter: function (y) { return '$' + y; }
      });
      return function () { if (ref.current) ref.current.innerHTML = ''; };
    }, []);
    return h('div', { ref: ref });
  }

  function MorrisBarChart(props) {
    var ref = useRef(null);
    useEffect(function () {
      if (!ref.current || !window.Morris) return;
      var chart = new Morris.Bar({
        element: ref.current,
        data: props.data,
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        barColors: props.colors
      });
      return function () { if (ref.current) ref.current.innerHTML = ''; };
    }, []);
    return h('div', { ref: ref });
  }

  function MorrisAreaChart(props) {
    var ref = useRef(null);
    useEffect(function () {
      if (!ref.current || !window.Morris) return;
      var chart = new Morris.Area({
        element: ref.current,
        data: props.data,
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Serie A', 'Serie B'],
        lineColors: props.colors
      });
      return function () { if (ref.current) ref.current.innerHTML = ''; };
    }, []);
    return h('div', { ref: ref });
  }

  function MorrisApp(props) {
    var colors = props.colors;
    var layoutColors = props.layoutColors;
    var morrisColors = [layoutColors.primary, layoutColors.warning, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.primaryDark];

    var lineData = [
      { y: '2006', a: 100, b: 90 }, { y: '2007', a: 75, b: 65 },
      { y: '2008', a: 50, b: 40 }, { y: '2009', a: 75, b: 65 },
      { y: '2010', a: 50, b: 40 }, { y: '2011', a: 75, b: 65 },
      { y: '2012', a: 100, b: 90 }
    ];
    var barData = [
      { y: '2006', a: 100, b: 90 }, { y: '2007', a: 75, b: 65 },
      { y: '2008', a: 50, b: 40 }, { y: '2009', a: 75, b: 65 },
      { y: '2010', a: 50, b: 40 }, { y: '2011', a: 75, b: 65 },
      { y: '2012', a: 100, b: 90 }
    ];
    var areaData = [
      { y: '2006', a: 100, b: 90 }, { y: '2007', a: 75, b: 65 },
      { y: '2008', a: 50, b: 40 }, { y: '2009', a: 75, b: 65 },
      { y: '2010', a: 50, b: 40 }, { y: '2011', a: 75, b: 65 },
      { y: '2012', a: 100, b: 90 }
    ];
    var donutData = [
      { label: 'Download Sales', value: 12 },
      { label: 'In-Store Sales', value: 30 },
      { label: 'Mail-Order Sales', value: 20 }
    ];

    return h('section', null,
      h('div', { className: 'row' },
        h('div', { className: 'col-md-12' },
          h(Panel, { title: 'Line Chart', panelClass: 'with-scroll' },
            h(MorrisLineChart, { data: lineData, colors: morrisColors })
          )
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-md-4' },
          h(Panel, { title: 'Donut', panelClass: 'with-scroll' },
            h(MorrisDonutChart, { data: donutData, colors: morrisColors })
          )
        ),
        h('div', { className: 'col-md-8' },
          h(Panel, { title: 'Bar Chart', panelClass: 'with-scroll' },
            h(MorrisBarChart, { data: barData, colors: morrisColors })
          )
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-md-12' },
          h(Panel, { title: 'Area Chart', panelClass: 'with-scroll' },
            h(MorrisAreaChart, { data: areaData, colors: morrisColors })
          )
        )
      )
    );
  }

  var mountEl = null;
  window.mountMorrisReact = function (element, colors) {
    mountEl = element;
    ReactDOM.render(h(MorrisApp, { layoutColors: colors }), element);
  };
  window.unmountMorrisReact = function () {
    if (mountEl) { ReactDOM.unmountComponentAtNode(mountEl); mountEl = null; }
  };
})();
