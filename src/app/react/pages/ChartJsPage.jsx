import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

var labels1D = ['Sleeping', 'Designing', 'Coding', 'Cycling'];
var data1D = [20, 40, 5, 35];

var labelsWave = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var labels2D = ['May', 'Jun', 'Jul', 'Aug', 'Sep'];
var data2D = [
  [65, 59, 90, 81, 56],
  [28, 48, 40, 19, 88]
];
var series2D = ['Product A', 'Product B'];

function getChartJsColors() {
  if (typeof Chart === 'undefined') return [];
  var defaults = Chart.defaults;
  if (defaults && defaults.global && defaults.global.colors) {
    return defaults.global.colors;
  }
  return ['#209e91', '#e85656', '#dfb81c', '#90b900', '#2dacd1', '#ffffff', '#1b867b', '#7a9d00', '#e8cd60', '#b1ce4c', '#37c4b4'];
}

function makeChart(canvasId, type, config) {
  var canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === 'undefined') return null;
  var ctx = canvas.getContext('2d');
  return new Chart(ctx, { type: type, data: config.data, options: config.options || {} });
}

function init1DChart(canvasId, chartType) {
  var colors = getChartJsColors();
  var bgColors = colors.slice(0, data1D.length);
  return makeChart(canvasId, chartType, {
    data: {
      labels: labels1D,
      datasets: [{
        data: data1D,
        backgroundColor: bgColors,
        borderWidth: 0
      }]
    },
    options: {
      elements: { arc: { borderWidth: 0 } },
      legend: { display: true, position: 'bottom', labels: { fontColor: '#666666' } },
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 2500 }
    }
  });
}

function initRadar2D(canvasId) {
  var colors = getChartJsColors();
  return makeChart(canvasId, 'radar', {
    data: {
      labels: labels2D,
      datasets: data2D.map(function (d, i) {
        return {
          label: series2D[i],
          data: d,
          backgroundColor: hexToRgba(colors[i] || '#209e91', 0.2),
          borderColor: colors[i] || '#209e91',
          pointBackgroundColor: colors[i] || '#209e91',
          fill: false
        };
      })
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 2500 },
      scale: {
        pointLabels: { fontColor: '#666666' },
        ticks: { maxTicksLimit: 5, display: false },
        gridLines: { color: '#dddddd' }
      }
    }
  });
}

function initLine2D(canvasId) {
  var colors = getChartJsColors();
  return makeChart(canvasId, 'line', {
    data: {
      labels: labels2D,
      datasets: data2D.map(function (d, i) {
        return {
          label: series2D[i],
          data: d,
          borderColor: colors[i] || '#209e91',
          backgroundColor: 'transparent',
          pointBackgroundColor: colors[i] || '#209e91',
          fill: false
        };
      })
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 2500 },
      scales: {
        xAxes: [{ gridLines: { color: '#dddddd' }, ticks: { fontColor: '#666666' } }],
        yAxes: [{ gridLines: { color: '#dddddd' }, ticks: { fontColor: '#666666' } }]
      }
    }
  });
}

function initBar2D(canvasId) {
  var colors = getChartJsColors();
  return makeChart(canvasId, 'bar', {
    data: {
      labels: labels2D,
      datasets: data2D.map(function (d, i) {
        return {
          label: series2D[i],
          data: d,
          backgroundColor: colors[i] || '#209e91'
        };
      })
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 2500 },
      tooltips: { enabled: false },
      scales: {
        xAxes: [{ gridLines: { color: '#dddddd' }, ticks: { fontColor: '#666666' } }],
        yAxes: [{ gridLines: { color: '#dddddd' }, ticks: { fontColor: '#666666' } }]
      }
    }
  });
}

function hexToRgba(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

export function ChartJsPage() {
  var waveLineRef = useRef(null);
  var waveBarsRef = useRef(null);
  var intervalRef = useRef(null);

  useEffect(function () {
    init1DChart('pie', 'pie');
    init1DChart('doughnut', 'doughnut');
    init1DChart('polarArea', 'polarArea');
    initRadar2D('radar');
    initLine2D('line');
    initBar2D('bar');

    var waveData = [1, 9, 3, 4, 5, 6, 7, 8, 2].map(function (e) {
      return Math.sin(e) * 25 + 25;
    });
    var colors = getChartJsColors();

    function createWaveChart(canvasId, chartType) {
      return makeChart(canvasId, chartType, {
        data: {
          labels: labelsWave,
          datasets: [{
            data: waveData.slice(),
            backgroundColor: hexToRgba(colors[0] || '#209e91', 0.4),
            borderColor: colors[0] || '#209e91',
            pointBackgroundColor: colors[0] || '#209e91'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 2500 },
          scale: {
            pointLabels: { fontColor: '#666666' },
            ticks: { maxTicksLimit: 5, display: false },
            gridLines: { color: '#dddddd' }
          }
        }
      });
    }

    waveLineRef.current = createWaveChart('waveLine', 'radar');
    waveBarsRef.current = createWaveChart('waveBars', 'bar');

    var currentData = waveData.slice();

    function startAnimation() {
      return setInterval(function () {
        var last = currentData[currentData.length - 1];
        for (var i = currentData.length - 1; i > 0; i--) {
          currentData[i] = currentData[i - 1];
        }
        currentData[0] = last;

        if (waveLineRef.current) {
          waveLineRef.current.data.datasets[0].data = currentData.slice();
          waveLineRef.current.update();
        }
        if (waveBarsRef.current) {
          waveBarsRef.current.data.datasets[0].data = currentData.slice();
          waveBarsRef.current.update();
        }
      }, 400);
    }

    intervalRef.current = startAnimation();

    function onFocus() {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = startAnimation();
    }
    function onBlur() {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    return function () {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return React.createElement('div', null,
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-4' },
        React.createElement(Panel, { title: 'Pie', panelClass: 'with-scroll' },
          React.createElement('div', { className: 'chartjs-canvas-holder-first-row' },
            React.createElement('canvas', { id: 'pie', className: 'chart chart-pie' })
          )
        )
      ),
      React.createElement('div', { className: 'col-md-4' },
        React.createElement(Panel, { title: 'Doughnut', panelClass: 'with-scroll' },
          React.createElement('div', { className: 'chartjs-canvas-holder-first-row' },
            React.createElement('canvas', { id: 'doughnut', className: 'chart chart-doughnut' })
          )
        )
      ),
      React.createElement('div', { className: 'col-md-4' },
        React.createElement(Panel, { title: 'Polar', panelClass: 'with-scroll' },
          React.createElement('div', { className: 'chartjs-canvas-holder-first-row' },
            React.createElement('canvas', { id: 'polar-area', className: 'chart chart-polar-area' })
          )
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-6' },
        React.createElement(Panel, { title: 'Animated Radar', panelClass: 'col-eq-height' },
          React.createElement('div', { className: 'chartjs-canvas-holder-second-row' },
            React.createElement('canvas', { id: 'waveLine', className: 'chart chart-radar' })
          )
        )
      ),
      React.createElement('div', { className: 'col-md-6' },
        React.createElement(Panel, { title: 'Animated Bars', panelClass: 'col-eq-height' },
          React.createElement('div', { className: 'chartjs-canvas-holder-second-row' },
            React.createElement('canvas', { id: 'waveBars', className: 'chart chart-bar' })
          )
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-lg-4 col-md-6' },
        React.createElement(Panel, { title: 'Radar', panelClass: 'with-scroll' },
          React.createElement('div', { className: 'chartjs-canvas-holder-third-row' },
            React.createElement('canvas', { id: 'radar', className: 'chart chart-radar' })
          )
        )
      ),
      React.createElement('div', { className: 'col-lg-4 col-md-6' },
        React.createElement(Panel, { title: 'Line', panelClass: 'with-scroll' },
          React.createElement('div', { className: 'chartjs-canvas-holder-third-row' },
            React.createElement('canvas', { id: 'line', className: 'chart chart-line' })
          )
        )
      ),
      React.createElement('div', { className: 'col-lg-4 col-md-12' },
        React.createElement(Panel, { title: 'Bars', panelClass: 'with-scroll' },
          React.createElement('div', { className: 'chartjs-canvas-holder-third-row' },
            React.createElement('canvas', { id: 'bar', className: 'chart chart-bar' })
          )
        )
      )
    )
  );
}
