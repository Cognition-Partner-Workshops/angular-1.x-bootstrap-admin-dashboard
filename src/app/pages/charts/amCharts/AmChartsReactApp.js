(function () {
  'use strict';

  var h = React.createElement;
  var useEffect = React.useEffect;
  var useRef = React.useRef;

  var LAYOUT_PATHS_AMCHART = 'assets/img/theme/vendor/amcharts/dist/amcharts/images/';

  function Panel(props) {
    return h('div', { className: 'panel ' + (props.panelClass || '') },
      h('div', { className: 'panel-heading clearfix' },
        h('h3', { className: 'panel-title' }, props.title)
      ),
      h('div', { className: 'panel-body' }, props.children)
    );
  }

  function BarChart(props) {
    var colors = props.colors;
    var ref = useRef(null);
    useEffect(function () {
      if (!ref.current || !window.AmCharts) return;
      var chart = AmCharts.makeChart(ref.current, {
        type: 'serial', theme: 'blur', color: colors.defaultText,
        dataProvider: [
          { country: 'USA', visits: 3025, color: colors.primary },
          { country: 'China', visits: 1882, color: colors.danger },
          { country: 'Japan', visits: 1809, color: colors.info },
          { country: 'Germany', visits: 1322, color: colors.success },
          { country: 'UK', visits: 1122, color: colors.warning },
          { country: 'France', visits: 1114, color: colors.primaryLight }
        ],
        valueAxes: [{ axisAlpha: 0, position: 'left', title: 'Visitors from country', gridAlpha: 0.5, gridColor: colors.border }],
        startDuration: 1,
        graphs: [{ balloonText: '<b>[[category]]: [[value]]</b>', fillColorsField: 'color', fillAlphas: 0.7, lineAlpha: 0.2, type: 'column', valueField: 'visits' }],
        chartCursor: { categoryBalloonEnabled: false, cursorAlpha: 0, zoomable: false },
        categoryField: 'country',
        categoryAxis: { gridPosition: 'start', labelRotation: 45, gridAlpha: 0.5, gridColor: colors.border },
        'export': { enabled: true }, creditsPosition: 'top-right', pathToImages: LAYOUT_PATHS_AMCHART
      });
      return function () { if (chart) chart.clear(); };
    }, []);
    return h('div', { id: 'barChart', className: 'admin-chart', ref: ref });
  }

  function AreaChart(props) {
    var colors = props.colors;
    var ref = useRef(null);
    useEffect(function () {
      if (!ref.current || !window.AmCharts) return;
      var chart = AmCharts.makeChart(ref.current, {
        type: 'serial', theme: 'blur', color: colors.defaultText,
        dataProvider: [
          { lineColor: colors.info, date: '2012-01-01', duration: 408 },
          { date: '2012-01-02', duration: 482 }, { date: '2012-01-03', duration: 562 },
          { date: '2012-01-04', duration: 379 },
          { lineColor: colors.warning, date: '2012-01-05', duration: 501 },
          { date: '2012-01-06', duration: 443 }, { date: '2012-01-07', duration: 405 },
          { date: '2012-01-08', duration: 309, lineColor: colors.danger },
          { date: '2012-01-09', duration: 287 }, { date: '2012-01-10', duration: 485 },
          { date: '2012-01-11', duration: 890 }, { date: '2012-01-12', duration: 810 }
        ],
        balloon: { cornerRadius: 6, horizontalPadding: 15, verticalPadding: 10 },
        valueAxes: [{ duration: 'mm', durationUnits: { hh: 'h ', mm: 'min' }, gridAlpha: 0.5, gridColor: colors.border }],
        graphs: [{ bullet: 'square', bulletBorderAlpha: 1, bulletBorderThickness: 1, fillAlphas: 0.5, fillColorsField: 'lineColor', legendValueText: '[[value]]', lineColorField: 'lineColor', title: 'duration', valueField: 'duration' }],
        chartCursor: { categoryBalloonDateFormat: 'YYYY MMM DD', cursorAlpha: 0, fullWidth: true },
        dataDateFormat: 'YYYY-MM-DD', categoryField: 'date',
        categoryAxis: { dateFormats: [{ period: 'DD', format: 'DD' }, { period: 'WW', format: 'MMM DD' }, { period: 'MM', format: 'MMM' }, { period: 'YYYY', format: 'YYYY' }], parseDates: true, autoGridCount: false, gridCount: 50, gridAlpha: 0.5, gridColor: colors.border },
        'export': { enabled: true }, pathToImages: LAYOUT_PATHS_AMCHART
      });
      chart.addListener('dataUpdated', function () { chart.zoomToDates(new Date(2012, 0, 3), new Date(2012, 0, 11)); });
      return function () { if (chart) chart.clear(); };
    }, []);
    return h('div', { id: 'areaChart', className: 'admin-chart', ref: ref });
  }

  function LineChart(props) {
    var colors = props.colors;
    var ref = useRef(null);
    useEffect(function () {
      if (!ref.current || !window.AmCharts) return;
      var chart = AmCharts.makeChart(ref.current, {
        type: 'serial', theme: 'blur', color: colors.defaultText, marginTop: 0, marginRight: 15,
        dataProvider: [
          { year: '1990', value: -0.17 }, { year: '1991', value: -0.254 }, { year: '1992', value: 0.019 },
          { year: '1993', value: -0.063 }, { year: '1994', value: 0.005 }, { year: '1995', value: 0.077 },
          { year: '1996', value: 0.12 }, { year: '1997', value: 0.011 }, { year: '1998', value: 0.177 },
          { year: '1999', value: -0.021 }, { year: '2000', value: -0.037 }, { year: '2001', value: 0.03 },
          { year: '2002', value: 0.179 }, { year: '2003', value: 0.2 }, { year: '2004', value: 0.180 },
          { year: '2005', value: 0.21 }
        ],
        valueAxes: [{ axisAlpha: 0, position: 'left', gridAlpha: 0.5, gridColor: colors.border }],
        graphs: [{ id: 'g1', balloonText: '[[value]]', bullet: 'round', bulletSize: 8, lineColor: colors.danger, lineThickness: 1, negativeLineColor: colors.warning, type: 'smoothedLine', valueField: 'value' }],
        chartScrollbar: { graph: 'g1', gridAlpha: 0, color: colors.defaultText, scrollbarHeight: 55, backgroundAlpha: 0, selectedBackgroundAlpha: 0.05, selectedBackgroundColor: colors.defaultText, graphFillAlpha: 0, autoGridCount: true, selectedGraphFillAlpha: 0, graphLineAlpha: 0.2, selectedGraphLineColor: colors.defaultText, selectedGraphLineAlpha: 1 },
        chartCursor: { categoryBalloonDateFormat: 'YYYY', cursorAlpha: 0, valueLineEnabled: true, valueLineBalloonEnabled: true, valueLineAlpha: 0.5, fullWidth: true },
        dataDateFormat: 'YYYY', categoryField: 'year',
        categoryAxis: { minPeriod: 'YYYY', parseDates: true, minorGridAlpha: 0.1, minorGridEnabled: true, gridAlpha: 0.5, gridColor: colors.border },
        'export': { enabled: true }, creditsPosition: 'bottom-right', pathToImages: LAYOUT_PATHS_AMCHART
      });
      chart.addListener('rendered', function () { chart.zoomToIndexes(Math.round(chart.dataProvider.length * 0.4), Math.round(chart.dataProvider.length * 0.55)); });
      if (chart.zoomChart) { chart.zoomChart(); }
      return function () { if (chart) chart.clear(); };
    }, []);
    return h('div', { id: 'lineChart', className: 'admin-chart', ref: ref });
  }

  function PieChart(props) {
    var colors = props.colors;
    var ref = useRef(null);
    useEffect(function () {
      if (!ref.current || !window.AmCharts) return;
      var chart = AmCharts.makeChart(ref.current, {
        type: 'pie', startDuration: 0, theme: 'blur', addClassNames: true, color: colors.defaultText, labelTickColor: colors.borderDark,
        legend: { position: 'right', marginRight: 100, autoMargins: false }, innerRadius: '40%',
        defs: { filter: [{ id: 'shadow', width: '200%', height: '200%', feOffset: { result: 'offOut', 'in': 'SourceAlpha', dx: 0, dy: 0 }, feGaussianBlur: { result: 'blurOut', 'in': 'offOut', stdDeviation: 5 }, feBlend: { 'in': 'SourceGraphic', in2: 'blurOut', mode: 'normal' } }] },
        dataProvider: [
          { country: 'Lithuania', litres: 501.9 }, { country: 'Czech Republic', litres: 301.9 },
          { country: 'Ireland', litres: 201.1 }, { country: 'Germany', litres: 165.8 },
          { country: 'Australia', litres: 139.9 }, { country: 'Austria', litres: 128.3 },
          { country: 'UK', litres: 99 }, { country: 'Belgium', litres: 60 }
        ],
        valueField: 'litres', titleField: 'country', 'export': { enabled: true }, creditsPosition: 'bottom-left',
        autoMargins: false, marginTop: 10, alpha: 0.8, marginBottom: 0, marginLeft: 0, marginRight: 0, pullOutRadius: 0,
        pathToImages: LAYOUT_PATHS_AMCHART,
        responsive: { enabled: true, rules: [{ maxWidth: 900, overrides: { legend: { enabled: false } } }, { maxWidth: 200, overrides: { valueAxes: { labelsEnabled: false }, marginTop: 30, marginBottom: 30, marginLeft: 30, marginRight: 30 } }] }
      });
      chart.addListener('init', function () { chart.legend.addListener('rollOverItem', handleRollOver); });
      chart.addListener('rollOverSlice', function (e) { handleRollOver(e); });
      function handleRollOver(e) { var wedge = e.dataItem.wedge.node; wedge.parentNode.appendChild(wedge); }
      return function () { if (chart) chart.clear(); };
    }, []);
    return h('div', { id: 'pieChart', className: 'admin-chart', ref: ref });
  }

  function FunnelChart(props) {
    var colors = props.colors;
    var ref = useRef(null);
    useEffect(function () {
      if (!ref.current || !window.AmCharts) return;
      var chart = AmCharts.makeChart(ref.current, {
        type: 'funnel', theme: 'blur', color: colors.defaultText, labelTickColor: colors.borderDark,
        dataProvider: [
          { title: 'Website visits', value: 300 }, { title: 'Downloads', value: 123 },
          { title: 'Requested prices', value: 98 }, { title: 'Contaced', value: 72 },
          { title: 'Purchased', value: 35 }, { title: 'Asked for support', value: 25 },
          { title: 'Purchased more', value: 18 }
        ],
        titleField: 'title', marginRight: 160, marginLeft: 15, labelPosition: 'right',
        funnelAlpha: 0.9, valueField: 'value', startX: 0, alpha: 0.8,
        neckWidth: '0%', startAlpha: 0, outlineThickness: 1, neckHeight: '0%',
        balloonText: '[[title]]:<b>[[value]]</b>', 'export': { enabled: true },
        creditsPosition: 'bottom-left', pathToImages: LAYOUT_PATHS_AMCHART
      });
      return function () { if (chart) chart.clear(); };
    }, []);
    return h('div', { id: 'funnelChart', className: 'admin-chart', ref: ref });
  }

  function CombinedChart(props) {
    var colors = props.colors;
    var ref = useRef(null);
    useEffect(function () {
      if (!ref.current || !window.AmCharts) return;
      var chart = AmCharts.makeChart(ref.current, {
        type: 'serial', theme: 'none', color: colors.defaultText, dataDateFormat: 'YYYY-MM-DD', precision: 2,
        valueAxes: [
          { color: colors.defaultText, axisColor: colors.defaultText, gridColor: colors.defaultText, id: 'v1', title: 'Sales', position: 'left', autoGridCount: false, labelFunction: function(value) { return '$' + Math.round(value) + 'M'; } },
          { color: colors.defaultText, axisColor: colors.defaultText, gridColor: colors.defaultText, id: 'v2', title: 'Market Days', gridAlpha: 0, position: 'right', autoGridCount: false }
        ],
        graphs: [
          { id: 'g3', color: colors.defaultText, valueAxis: 'v1', lineColor: colors.primaryLight, fillColors: colors.primaryLight, fillAlphas: 0.8, lineAlpha: 0.8, type: 'column', title: 'Actual Sales', valueField: 'sales2', clustered: false, columnWidth: 0.5, lineColorField: colors.defaultText, legendValueText: '$[[value]]M', balloonText: "[[title]]<br/><b style='font-size: 130%'>$[[value]]M</b>" },
          { id: 'g4', valueAxis: 'v1', color: colors.defaultText, lineColor: colors.primary, fillColors: colors.primary, fillAlphas: 0.9, lineAlpha: 0.9, type: 'column', title: 'Target Sales', valueField: 'sales1', clustered: false, columnWidth: 0.3, legendValueText: '$[[value]]M', balloonText: "[[title]]<br/><b style='font-size: 130%'>$[[value]]M</b>" },
          { id: 'g1', valueAxis: 'v2', bullet: 'round', bulletBorderAlpha: 1, bulletColor: colors.defaultText, color: colors.defaultText, bulletSize: 5, hideBulletsCount: 50, lineThickness: 2, lineColor: colors.danger, type: 'smoothedLine', title: 'Market Days', useLineColorForBulletBorder: true, valueField: 'market1', balloonText: "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>" },
          { id: 'g2', valueAxis: 'v2', color: colors.defaultText, bullet: 'round', bulletBorderAlpha: 1, bulletColor: colors.defaultText, bulletSize: 5, hideBulletsCount: 50, lineThickness: 2, lineColor: colors.warning, type: 'smoothedLine', dashLength: 5, title: 'Market Days ALL', useLineColorForBulletBorder: true, valueField: 'market2', balloonText: "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>" }
        ],
        chartScrollbar: { graph: 'g1', oppositeAxis: false, offset: 30, gridAlpha: 0, color: colors.defaultText, scrollbarHeight: 50, backgroundAlpha: 0, selectedBackgroundAlpha: 0.05, selectedBackgroundColor: colors.defaultText, graphFillAlpha: 0, autoGridCount: true, selectedGraphFillAlpha: 0, graphLineAlpha: 0.2, selectedGraphLineColor: colors.defaultText, selectedGraphLineAlpha: 1 },
        chartCursor: { pan: true, cursorColor: colors.danger, valueLineEnabled: true, valueLineBalloonEnabled: true, cursorAlpha: 0, valueLineAlpha: 0.2 },
        categoryField: 'date',
        categoryAxis: { axisColor: colors.defaultText, color: colors.defaultText, gridColor: colors.defaultText, parseDates: true, dashLength: 1, minorGridEnabled: true },
        legend: { useGraphSettings: true, position: 'top', color: colors.defaultText },
        balloon: { borderThickness: 1, shadowAlpha: 0 }, 'export': { enabled: true },
        dataProvider: [
          { date: '2013-01-16', market1: 71, market2: 75, sales1: 5, sales2: 8 },
          { date: '2013-01-17', market1: 74, market2: 78, sales1: 4, sales2: 6 },
          { date: '2013-01-18', market1: 78, market2: 88, sales1: 5, sales2: 2 },
          { date: '2013-01-19', market1: 85, market2: 89, sales1: 8, sales2: 9 },
          { date: '2013-01-20', market1: 82, market2: 89, sales1: 9, sales2: 6 },
          { date: '2013-01-21', market1: 83, market2: 85, sales1: 3, sales2: 5 },
          { date: '2013-01-22', market1: 88, market2: 92, sales1: 5, sales2: 7 },
          { date: '2013-01-23', market1: 85, market2: 90, sales1: 7, sales2: 6 },
          { date: '2013-01-24', market1: 85, market2: 91, sales1: 9, sales2: 5 },
          { date: '2013-01-25', market1: 80, market2: 84, sales1: 5, sales2: 8 },
          { date: '2013-01-26', market1: 87, market2: 92, sales1: 4, sales2: 8 },
          { date: '2013-01-27', market1: 84, market2: 87, sales1: 3, sales2: 4 },
          { date: '2013-01-28', market1: 83, market2: 88, sales1: 5, sales2: 7 },
          { date: '2013-01-29', market1: 84, market2: 87, sales1: 5, sales2: 8 },
          { date: '2013-01-30', market1: 81, market2: 85, sales1: 4, sales2: 7 }
        ],
        pathToImages: LAYOUT_PATHS_AMCHART
      });
      return function () { if (chart) chart.clear(); };
    }, []);
    return h('div', { id: 'zoomAxisChart', className: 'admin-chart', ref: ref });
  }

  function AmChartsApp(props) {
    var colors = props.colors;
    return h('div', { className: 'widgets' },
      h('div', { className: 'row' },
        h('div', { className: 'col-lg-4 col-md-6' },
          h(Panel, { title: 'Bar Chart', panelClass: 'with-scroll' }, h(BarChart, { colors: colors }))
        ),
        h('div', { className: 'col-lg-4 col-md-6' },
          h(Panel, { title: 'Area Chart', panelClass: 'with-scroll' }, h(AreaChart, { colors: colors }))
        ),
        h('div', { className: 'col-lg-4 col-md-12' },
          h(Panel, { title: 'Line Chart', panelClass: 'with-scroll' }, h(LineChart, { colors: colors }))
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-md-6' },
          h(Panel, { title: 'Pie Chart', panelClass: 'with-scroll' }, h(PieChart, { colors: colors }))
        ),
        h('div', { className: 'col-md-6' },
          h(Panel, { title: 'Funnel Chart', panelClass: 'with-scroll' }, h(FunnelChart, { colors: colors }))
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-md-12' },
          h(Panel, { title: 'Combined bullet/column and line graphs with multiple value axes', panelClass: 'with-scroll' }, h(CombinedChart, { colors: colors }))
        )
      )
    );
  }

  var mountEl = null;
  window.mountAmChartsReact = function (element, colors) {
    mountEl = element;
    ReactDOM.render(h(AmChartsApp, { colors: colors }), element);
  };
  window.unmountAmChartsReact = function () {
    if (mountEl) { ReactDOM.unmountComponentAtNode(mountEl); mountEl = null; }
  };
})();
