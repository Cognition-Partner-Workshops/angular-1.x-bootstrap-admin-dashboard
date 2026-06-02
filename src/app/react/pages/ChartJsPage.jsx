/**
 * ChartJsPage — React migration of src/app/pages/charts/chartJs.
 *
 * Replaces chartJs.html + chartJs1DCtrl / chartJs2DCtrl / chartJsWaveCtrl and the
 * angular-chart.js `chart-*` directives. Charts are drawn directly with the global
 * Chart.js (v2) library onto canvas elements that preserve the original ids/classes.
 *
 * baConfig is injected by the AngularJS bridge directive and passed in as a prop.
 */
import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

var ONE_D_LABELS = ['Sleeping', 'Designing', 'Coding', 'Cycling'];
var ONE_D_DATA = [20, 40, 5, 35];

var TWO_D_LABELS = ['May', 'Jun', 'Jul', 'Aug', 'Sep'];
var TWO_D_DATA = [
  [65, 59, 90, 81, 56],
  [28, 48, 40, 19, 88]
];
var TWO_D_SERIES = ['Product A', 'Product B'];

var WAVE_LABELS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function ChartJsPage({ baConfig }) {
  var layoutColors = (baConfig && baConfig.colors) || {};
  var chartColors = [
    layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success,
    layoutColors.info, layoutColors.default, layoutColors.primaryDark, layoutColors.successDark,
    layoutColors.warningLight, layoutColors.successLight, layoutColors.primaryLight
  ];

  var pieRef = useRef(null);
  var doughnutRef = useRef(null);
  var polarRef = useRef(null);
  var waveLineRef = useRef(null);
  var waveBarsRef = useRef(null);
  var radarRef = useRef(null);
  var lineRef = useRef(null);
  var barRef = useRef(null);

  useEffect(function () {
    var Chart = window.Chart;
    if (!Chart) {
      return undefined;
    }

    var instances = [];
    var intervals = [];

    var baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 2500 },
      legend: {
        display: true,
        position: 'bottom',
        labels: { fontColor: layoutColors.defaultText }
      }
    };

    function makeSingleValueChart(canvas, type) {
      if (!canvas) { return; }
      var chart = new Chart(canvas.getContext('2d'), {
        type: type,
        data: {
          labels: ONE_D_LABELS,
          datasets: [{ data: ONE_D_DATA.slice(), backgroundColor: chartColors }]
        },
        options: baseOptions
      });
      instances.push(chart);
    }

    makeSingleValueChart(pieRef.current, 'pie');
    makeSingleValueChart(doughnutRef.current, 'doughnut');
    makeSingleValueChart(polarRef.current, 'polarArea');

    function makeWaveChart(canvas, type) {
      if (!canvas) { return; }
      var data = [1, 9, 3, 4, 5, 6, 7, 8, 2].map(function (e) {
        return Math.sin(e) * 25 + 25;
      });
      var chart = new Chart(canvas.getContext('2d'), {
        type: type,
        data: {
          labels: WAVE_LABELS,
          datasets: [{
            data: data,
            label: 'Wave',
            backgroundColor: chartColors[0],
            borderColor: chartColors[0]
          }]
        },
        options: baseOptions
      });
      instances.push(chart);
      var interval = window.setInterval(function () {
        var current = chart.data.datasets[0].data;
        var last = current[current.length - 1];
        var next = [last].concat(current.slice(0, current.length - 1));
        chart.data.datasets[0].data = next;
        chart.update();
      }, 400);
      intervals.push(interval);
    }

    makeWaveChart(waveLineRef.current, 'radar');
    makeWaveChart(waveBarsRef.current, 'bar');

    function makeMultiSeriesChart(canvas, type) {
      if (!canvas) { return; }
      var datasets = TWO_D_DATA.map(function (series, i) {
        return {
          label: TWO_D_SERIES[i],
          data: series.slice(),
          backgroundColor: chartColors[i],
          borderColor: chartColors[i]
        };
      });
      var chart = new Chart(canvas.getContext('2d'), {
        type: type,
        data: { labels: TWO_D_LABELS, datasets: datasets },
        options: baseOptions
      });
      instances.push(chart);
    }

    makeMultiSeriesChart(radarRef.current, 'radar');
    makeMultiSeriesChart(lineRef.current, 'line');
    makeMultiSeriesChart(barRef.current, 'bar');

    return function () {
      intervals.forEach(function (id) { window.clearInterval(id); });
      instances.forEach(function (chart) {
        if (chart && typeof chart.destroy === 'function') {
          chart.destroy();
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <Panel title="Pie" panelClass="with-scroll ">
            <div className="chartjs-canvas-holder-first-row">
              <canvas id="pie" className="chart chart-pie" ref={pieRef}></canvas>
            </div>
          </Panel>
        </div>
        <div className="col-md-4">
          <Panel title="Doughnut" panelClass="with-scroll ">
            <div className="chartjs-canvas-holder-first-row">
              <canvas id="doughnut" className="chart chart-doughnut" ref={doughnutRef}></canvas>
            </div>
          </Panel>
        </div>
        <div className="col-md-4">
          <Panel title="Polar" panelClass="with-scroll ">
            <div className="chartjs-canvas-holder-first-row">
              <canvas id="polar-area" className="chart chart-polar-area" ref={polarRef}></canvas>
            </div>
          </Panel>
        </div>
      </div>

      <div className="row ">
        <div className="col-md-6">
          <Panel title="Animated Radar" panelClass="col-eq-height">
            <div className="chartjs-canvas-holder-second-row">
              <canvas id="waveLine" className="chart chart-radar" ref={waveLineRef}></canvas>
            </div>
          </Panel>
        </div>
        <div className="col-md-6">
          <Panel title="Animated Bars" panelClass="col-eq-height">
            <div className="chartjs-canvas-holder-second-row">
              <canvas id="waveBars" className="chart chart-bar" ref={waveBarsRef}></canvas>
            </div>
          </Panel>
        </div>
      </div>

      <div className="row ">
        <div className="col-lg-4 col-md-6">
          <Panel title="Radar" panelClass="with-scroll ">
            <div className="chartjs-canvas-holder-third-row">
              <canvas id="radar" className="chart chart-radar" ref={radarRef}></canvas>
            </div>
          </Panel>
        </div>
        <div className="col-lg-4 col-md-6">
          <Panel title="Line" panelClass="with-scroll ">
            <div className="chartjs-canvas-holder-third-row">
              <canvas id="line" className="chart chart-line" ref={lineRef}></canvas>
            </div>
          </Panel>
        </div>
        <div className="col-lg-4 col-md-12">
          <Panel title="Bars" panelClass="with-scroll ">
            <div className="chartjs-canvas-holder-third-row">
              <canvas id="bar" className="chart chart-bar" ref={barRef}></canvas>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
