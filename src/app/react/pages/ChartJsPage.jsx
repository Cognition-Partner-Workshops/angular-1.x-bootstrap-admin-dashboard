/**
 * ChartJsPage — React port of the AngularJS `charts.chartJs` page.
 *
 * Replaces app/pages/charts/chartJs/chartJs.html plus chartJs1DCtrl,
 * chartJs2DCtrl and chartJsWaveCtrl. Charts are created directly against the
 * global Chart.js (v2.4) library, replicating the dataset/colour construction
 * and the ChartJsProvider option defaults that angular-chart.js applied for the
 * `chart-*` directives. Theme colours come from baConfig. Instances are
 * destroyed (and the wave animation interval cleared) on unmount.
 */
import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

function rgba(color, alpha) {
  return 'rgba(' + color.concat(alpha).join(',') + ')';
}

function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function getColor(color) {
  return {
    backgroundColor: rgba(color, 0.2),
    pointBackgroundColor: rgba(color, 1),
    pointHoverBackgroundColor: rgba(color, 0.8),
    borderColor: rgba(color, 1),
    pointBorderColor: '#fff',
    pointHoverBorderColor: rgba(color, 1)
  };
}

function buildColors(palette, count) {
  var colors = [];
  for (var i = 0; i < count; i++) {
    var hex = palette[i % palette.length];
    colors.push(getColor(hexToRgb(hex.substr(1))));
  }
  return colors;
}

// 1D data (pie/doughnut/polar): single dataset, per-slice colours
function getData(palette, labels, data) {
  var colors = buildColors(palette, data.length);
  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors.map(function (c) { return c.pointBackgroundColor; }),
        hoverBackgroundColor: colors.map(function (c) { return c.backgroundColor; })
      }
    ]
  };
}

// 2D data (radar/line/bar): one dataset per series
function getDataSets(palette, labels, data, series, extra) {
  var colors = buildColors(palette, data.length);
  return {
    labels: labels,
    datasets: data.map(function (item, i) {
      return Object.assign({}, colors[i], { label: series[i], data: item }, extra || {});
    })
  };
}

export function ChartJsPage({ baConfig }) {
  var layoutColors = baConfig.colors;
  var canvasRefs = useRef({});

  useEffect(function () {
    var Chart = window.Chart;
    if (!Chart) {
      return undefined;
    }

    // Palette configured by chartJsConfig via ChartJsProvider.setOptions
    var palette = [
      layoutColors.primary, layoutColors.danger, layoutColors.warning,
      layoutColors.success, layoutColors.info, layoutColors.default,
      layoutColors.primaryDark, layoutColors.successDark, layoutColors.warningLight,
      layoutColors.successLight, layoutColors.primaryLight
    ];

    // Base options applied to every chart (ChartJsProvider.setOptions)
    var baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 2500 },
      scale: {
        gridLines: { color: layoutColors.border },
        scaleLabel: { fontColor: layoutColors.defaultText },
        ticks: { fontColor: layoutColors.defaultText, showLabelBackdrop: false }
      }
    };

    var instances = [];
    var intervals = [];

    function create(id, config) {
      var canvas = canvasRefs.current[id];
      if (!canvas) {
        return null;
      }
      var chart = new Chart(canvas, config);
      instances.push(chart);
      return chart;
    }

    // ---- 1D charts (pie / doughnut / polar) ----
    var oneDLabels = ['Sleeping', 'Designing', 'Coding', 'Cycling'];
    var oneDData = [20, 40, 5, 35];
    var oneDOptions = Object.assign({}, baseOptions, {
      elements: { arc: { borderWidth: 0 } },
      legend: {
        display: true,
        position: 'bottom',
        labels: { fontColor: layoutColors.defaultText }
      }
    });
    create('pie', { type: 'pie', data: getData(palette, oneDLabels, oneDData), options: oneDOptions });
    create('doughnut', { type: 'doughnut', data: getData(palette, oneDLabels, oneDData), options: oneDOptions });
    create('polar-area', { type: 'polarArea', data: getData(palette, oneDLabels, oneDData), options: oneDOptions });

    // ---- 2D charts (radar / line / bar) ----
    var twoDLabels = ['May', 'Jun', 'Jul', 'Aug', 'Sep'];
    var twoDData = [
      [65, 59, 90, 81, 56],
      [28, 48, 40, 19, 88]
    ];
    var twoDSeries = ['Product A', 'Product B'];

    var radarOptions = Object.assign({}, baseOptions, {
      scale: Object.assign({}, baseOptions.scale, {
        pointLabels: { fontColor: layoutColors.defaultText },
        ticks: { maxTicksLimit: 5, display: false }
      })
    });
    var lineOptions = Object.assign({}, baseOptions);
    var barOptions = Object.assign({}, baseOptions, { tooltips: { enabled: false } });

    create('radar', { type: 'radar', data: getDataSets(palette, twoDLabels, twoDData, twoDSeries), options: radarOptions });
    create('line', { type: 'line', data: getDataSets(palette, twoDLabels, twoDData, twoDSeries, { fill: false }), options: lineOptions });
    create('bar', { type: 'bar', data: getDataSets(palette, twoDLabels, twoDData, twoDSeries), options: barOptions });

    // ---- Animated wave charts (radar / bar) ----
    var waveLabels = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function makeWave(id, type, options) {
      var data = [1, 9, 3, 4, 5, 6, 7, 8, 2].map(function (e) {
        return Math.sin(e) * 25 + 25;
      });
      var chart = create(id, { type: type, data: getDataSets(palette, waveLabels, [data], []), options: options });
      if (!chart) {
        return;
      }
      var interval = setInterval(function () {
        var tempArray = [];
        var lastElement = data[data.length - 1];
        for (var i = data.length - 1; i > 0; i--) {
          tempArray[i] = data[i - 1];
        }
        tempArray[0] = lastElement;
        data = tempArray;
        chart.data.datasets[0].data = data;
        chart.update();
      }, 400);
      intervals.push(interval);
    }

    makeWave('waveLine', 'radar', radarOptions);
    makeWave('waveBars', 'bar', barOptions);

    return function () {
      intervals.forEach(function (i) { clearInterval(i); });
      instances.forEach(function (chart) {
        try {
          chart.destroy();
        } catch (e) {
          /* no-op */
        }
      });
    };
  }, []);

  function setRef(id) {
    return function (el) {
      canvasRefs.current[id] = el;
    };
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <Panel title="Pie" panelClass="with-scroll ">
            <div className="chartjs-canvas-holder-first-row">
              <canvas id="pie" className="chart chart-pie" ref={setRef('pie')} />
            </div>
          </Panel>
        </div>
        <div className="col-md-4">
          <Panel title="Doughnut" panelClass="with-scroll ">
            <div className="chartjs-canvas-holder-first-row">
              <canvas id="doughnut" className="chart chart-doughnut" ref={setRef('doughnut')} />
            </div>
          </Panel>
        </div>
        <div className="col-md-4">
          <Panel title="Polar" panelClass="with-scroll ">
            <div className="chartjs-canvas-holder-first-row">
              <canvas id="polar-area" className="chart chart-polar-area" ref={setRef('polar-area')} />
            </div>
          </Panel>
        </div>
      </div>

      <div className="row ">
        <div className="col-md-6">
          <Panel title="Animated Radar" panelClass="col-eq-height">
            <div className="chartjs-canvas-holder-second-row">
              <canvas id="waveLine" className="chart chart-radar" ref={setRef('waveLine')} />
            </div>
          </Panel>
        </div>
        <div className="col-md-6">
          <Panel title="Animated Bars" panelClass="col-eq-height">
            <div className="chartjs-canvas-holder-second-row">
              <canvas id="waveBars" className="chart chart-bar" ref={setRef('waveBars')} />
            </div>
          </Panel>
        </div>
      </div>

      <div className="row ">
        <div className="col-lg-4 col-md-6">
          <Panel title="Radar" panelClass="with-scroll ">
            <div className="chartjs-canvas-holder-third-row">
              <canvas id="radar" className="chart chart-radar" ref={setRef('radar')} />
            </div>
          </Panel>
        </div>
        <div className="col-lg-4 col-md-6">
          <Panel title="Line" panelClass="with-scroll ">
            <div className="chartjs-canvas-holder-third-row">
              <canvas id="line" className="chart chart-line" ref={setRef('line')} />
            </div>
          </Panel>
        </div>
        <div className="col-lg-4 col-md-12">
          <Panel title="Bars" panelClass="with-scroll ">
            <div className="chartjs-canvas-holder-third-row">
              <canvas id="bar" className="chart chart-bar" ref={setRef('bar')} />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
