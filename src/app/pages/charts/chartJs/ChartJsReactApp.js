(function () {
  'use strict';

  var h = React.createElement;
  var useEffect = React.useEffect;
  var useRef = React.useRef;
  var useState = React.useState;

  function Panel(props) {
    return h('div', { className: 'panel ' + (props.panelClass || '') },
      h('div', { className: 'panel-heading clearfix' },
        h('h3', { className: 'panel-title' }, props.title)
      ),
      h('div', { className: 'panel-body' }, props.children)
    );
  }

  function shuffle(o) {
    var arr = o.slice();
    for (var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x) {}
    return arr;
  }

  function toKebab(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  function baseOptions(colors, type) {
    var opts = {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 2500 },
      scale: {
        gridLines: { color: colors.border },
        scaleLabel: { fontColor: colors.defaultText },
        ticks: { fontColor: colors.defaultText, showLabelBackdrop: false }
      }
    };
    if (type === 'radar') {
      opts.scale.pointLabels = { fontColor: colors.defaultText };
      opts.scale.ticks.maxTicksLimit = 5;
      opts.scale.ticks.display = false;
    }
    if (type === 'bar') {
      opts.tooltips = { enabled: false };
    }
    return opts;
  }

  function ChartJs1D(props) {
    var canvasRef = useRef(null);
    var chartRef = useRef(null);
    var colors = props.colors;

    useEffect(function () {
      if (!canvasRef.current || !window.Chart) return;
      var ctx = canvasRef.current.getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: props.type,
        data: {
          labels: ['Sleeping', 'Designing', 'Coding', 'Cycling'],
          datasets: [{ data: [20, 40, 5, 35], backgroundColor: [colors.primary, colors.danger, colors.warning, colors.success] }]
        },
        options: Object.assign({}, baseOptions(colors, props.type), {
          elements: { arc: { borderWidth: 0 } },
          legend: { display: true, position: 'bottom', labels: { fontColor: colors.defaultText } }
        })
      });
      return function () { if (chartRef.current) chartRef.current.destroy(); };
    }, []);

    return h('canvas', { id: props.id, className: 'chart chart-' + toKebab(props.type), ref: canvasRef });
  }

  function ChartJsWave(props) {
    var canvasRef = useRef(null);
    var chartRef = useRef(null);
    var colors = props.colors;

    useEffect(function () {
      if (!canvasRef.current || !window.Chart) return;
      var data = [1, 9, 3, 4, 5, 6, 7, 8, 2].map(function (e) { return Math.sin(e) * 25 + 25; });
      var labels = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var chartType = props.type;
      chartRef.current = new Chart(canvasRef.current.getContext('2d'), {
        type: chartType,
        data: {
          labels: labels,
          datasets: [{ data: data, backgroundColor: colors.primary, borderColor: colors.primary, fill: chartType !== 'radar' }]
        },
        options: baseOptions(colors, chartType)
      });
      var interval = setInterval(function () {
        var ds = chartRef.current.data.datasets[0].data;
        var last = ds[ds.length - 1];
        var tempArray = [];
        for (var i = ds.length - 1; i > 0; i--) { tempArray[i] = ds[i - 1]; }
        tempArray[0] = last;
        chartRef.current.data.datasets[0].data = tempArray;
        chartRef.current.update();
      }, 400);
      return function () { clearInterval(interval); if (chartRef.current) chartRef.current.destroy(); };
    }, []);

    return h('canvas', { id: props.id, className: 'chart chart-' + toKebab(props.type), ref: canvasRef });
  }

  function ChartJs2D(props) {
    var canvasRef = useRef(null);
    var chartRef = useRef(null);
    var colors = props.colors;

    useEffect(function () {
      if (!canvasRef.current || !window.Chart) return;
      chartRef.current = new Chart(canvasRef.current.getContext('2d'), {
        type: props.type,
        data: {
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
          datasets: [
            { label: 'Product A', data: [65, 59, 90, 81, 56], backgroundColor: colors.primary, borderColor: colors.primary, fill: false },
            { label: 'Product B', data: [28, 48, 40, 19, 88], backgroundColor: colors.danger, borderColor: colors.danger, fill: false }
          ]
        },
        options: baseOptions(colors, props.type)
      });
      return function () { if (chartRef.current) chartRef.current.destroy(); };
    }, []);

    return h('canvas', { id: props.id, className: 'chart chart-' + toKebab(props.type), ref: canvasRef });
  }

  function ChartJsApp(props) {
    var colors = props.colors;
    return h('div', null,
      h('div', { className: 'row' },
        h('div', { className: 'col-md-4' },
          h(Panel, { title: 'Pie', panelClass: 'with-scroll' },
            h('div', { className: 'chartjs-canvas-holder-first-row' },
              h(ChartJs1D, { id: 'pie', type: 'pie', colors: colors })
            )
          )
        ),
        h('div', { className: 'col-md-4' },
          h(Panel, { title: 'Doughnut', panelClass: 'with-scroll' },
            h('div', { className: 'chartjs-canvas-holder-first-row' },
              h(ChartJs1D, { id: 'doughnut', type: 'doughnut', colors: colors })
            )
          )
        ),
        h('div', { className: 'col-md-4' },
          h(Panel, { title: 'Polar', panelClass: 'with-scroll' },
            h('div', { className: 'chartjs-canvas-holder-first-row' },
              h(ChartJs1D, { id: 'polar-area', type: 'polarArea', colors: colors })
            )
          )
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-md-6' },
          h(Panel, { title: 'Animated Radar', panelClass: 'col-eq-height' },
            h('div', { className: 'chartjs-canvas-holder-second-row' },
              h(ChartJsWave, { id: 'waveLine', type: 'radar', colors: colors })
            )
          )
        ),
        h('div', { className: 'col-md-6' },
          h(Panel, { title: 'Animated Bars', panelClass: 'col-eq-height' },
            h('div', { className: 'chartjs-canvas-holder-second-row' },
              h(ChartJsWave, { id: 'waveBars', type: 'bar', colors: colors })
            )
          )
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-lg-4 col-md-6' },
          h(Panel, { title: 'Radar', panelClass: 'with-scroll' },
            h('div', { className: 'chartjs-canvas-holder-third-row' },
              h(ChartJs2D, { id: 'radar', type: 'radar', colors: colors })
            )
          )
        ),
        h('div', { className: 'col-lg-4 col-md-6' },
          h(Panel, { title: 'Line', panelClass: 'with-scroll' },
            h('div', { className: 'chartjs-canvas-holder-third-row' },
              h(ChartJs2D, { id: 'line', type: 'line', colors: colors })
            )
          )
        ),
        h('div', { className: 'col-lg-4 col-md-12' },
          h(Panel, { title: 'Bars', panelClass: 'with-scroll' },
            h('div', { className: 'chartjs-canvas-holder-third-row' },
              h(ChartJs2D, { id: 'bar', type: 'bar', colors: colors })
            )
          )
        )
      )
    );
  }

  var mountEl = null;
  window.mountChartJsReact = function (element, colors) {
    mountEl = element;
    ReactDOM.render(h(ChartJsApp, { colors: colors }), element);
  };
  window.unmountChartJsReact = function () {
    if (mountEl) { ReactDOM.unmountComponentAtNode(mountEl); mountEl = null; }
  };
})();
