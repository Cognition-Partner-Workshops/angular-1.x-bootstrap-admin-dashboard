import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

function hexToRgba(hex, alpha) {
  var r = parseInt(hex.substr(1, 2), 16);
  var g = parseInt(hex.substr(3, 2), 16);
  var b = parseInt(hex.substr(5, 2), 16);
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
}

export function ChartJsPage({ baConfig }) {
  var layoutColors = baConfig.colors;
  var chartsRef = useRef([]);
  var intervalsRef = useRef([]);

  var chartColors = [
    layoutColors.primary, layoutColors.danger, layoutColors.warning,
    layoutColors.success, layoutColors.info, layoutColors.default,
    layoutColors.primaryDark, layoutColors.successDark,
    layoutColors.warningLight, layoutColors.successLight,
    layoutColors.primaryLight
  ];

  useEffect(function () {
    var Chart = window.Chart;
    if (!Chart) return;

    var charts = [];
    var waveCharts = [];

    var globalOpts = {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 2500 },
      scale: {
        gridLines: { color: layoutColors.border },
        scaleLabel: { fontColor: layoutColors.defaultText },
        ticks: { fontColor: layoutColors.defaultText, showLabelBackdrop: false }
      }
    };

    // 1D data
    var labels1D = ['Sleeping', 'Designing', 'Coding', 'Cycling'];
    var data1D = [20, 40, 5, 35];
    var options1D = {
      responsive: globalOpts.responsive,
      maintainAspectRatio: globalOpts.maintainAspectRatio,
      animation: globalOpts.animation,
      elements: { arc: { borderWidth: 0 } },
      legend: {
        display: true, position: 'bottom',
        labels: { fontColor: layoutColors.defaultText }
      }
    };

    // Pie
    var pieCtx = document.getElementById('pie');
    if (pieCtx) {
      charts.push(new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: labels1D,
          datasets: [{ data: data1D, backgroundColor: chartColors.slice(0, 4) }]
        },
        options: options1D
      }));
    }

    // Doughnut
    var doughnutCtx = document.getElementById('doughnut');
    if (doughnutCtx) {
      charts.push(new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
          labels: labels1D,
          datasets: [{ data: data1D, backgroundColor: chartColors.slice(0, 4) }]
        },
        options: options1D
      }));
    }

    // Polar Area
    var polarCtx = document.getElementById('polar-area');
    if (polarCtx) {
      charts.push(new Chart(polarCtx, {
        type: 'polarArea',
        data: {
          labels: labels1D,
          datasets: [{ data: data1D, backgroundColor: chartColors.slice(0, 4) }]
        },
        options: options1D
      }));
    }

    // Wave data
    var waveLabels = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var waveData = [1, 9, 3, 4, 5, 6, 7, 8, 2].map(function (e) {
      return Math.sin(e) * 25 + 25;
    });

    // Animated Radar (waveLine)
    var waveLineCtx = document.getElementById('waveLine');
    if (waveLineCtx) {
      var waveLineChart = new Chart(waveLineCtx, {
        type: 'radar',
        data: {
          labels: waveLabels,
          datasets: [{
            data: waveData.slice(),
            borderColor: chartColors[0],
            backgroundColor: hexToRgba(chartColors[0], 0.2),
            pointBackgroundColor: chartColors[0],
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: chartColors[0]
          }]
        },
        options: {
          responsive: globalOpts.responsive,
          maintainAspectRatio: globalOpts.maintainAspectRatio,
          animation: { duration: 400 },
          scale: {
            pointLabels: { fontColor: layoutColors.defaultText },
            ticks: { maxTicksLimit: 5, display: false },
            gridLines: { color: layoutColors.border }
          }
        }
      });
      charts.push(waveLineChart);
      waveCharts.push(waveLineChart);
    }

    // Animated Bars (waveBars)
    var waveBarsCtx = document.getElementById('waveBars');
    if (waveBarsCtx) {
      var waveBarsChart = new Chart(waveBarsCtx, {
        type: 'bar',
        data: {
          labels: waveLabels,
          datasets: [{
            data: waveData.slice(),
            backgroundColor: chartColors[0],
            borderColor: chartColors[0],
            borderWidth: 1
          }]
        },
        options: {
          responsive: globalOpts.responsive,
          maintainAspectRatio: globalOpts.maintainAspectRatio,
          animation: { duration: 400 },
          tooltips: { enabled: false },
          scales: {
            xAxes: [{
              gridLines: { color: layoutColors.border },
              ticks: { fontColor: layoutColors.defaultText }
            }],
            yAxes: [{
              gridLines: { color: layoutColors.border },
              ticks: { fontColor: layoutColors.defaultText }
            }]
          }
        }
      });
      charts.push(waveBarsChart);
      waveCharts.push(waveBarsChart);
    }

    // Wave animation (stopableInterval equivalent)
    function rotateData(chart) {
      var data = chart.data.datasets[0].data;
      var last = data[data.length - 1];
      var newData = [];
      for (var i = data.length - 1; i > 0; i--) {
        newData[i] = data[i - 1];
      }
      newData[0] = last;
      chart.data.datasets[0].data = newData;
      chart.update();
    }

    function startIntervals() {
      return waveCharts.map(function (chart) {
        return setInterval(function () { rotateData(chart); }, 400);
      });
    }

    intervalsRef.current = startIntervals();

    function onFocus() {
      intervalsRef.current.forEach(function (id) { clearInterval(id); });
      intervalsRef.current = startIntervals();
    }
    function onBlur() {
      intervalsRef.current.forEach(function (id) { clearInterval(id); });
      intervalsRef.current = [];
    }
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    // 2D data
    var labels2D = ['May', 'Jun', 'Jul', 'Aug', 'Sep'];
    var data2D = [
      [65, 59, 90, 81, 56],
      [28, 48, 40, 19, 88]
    ];
    var series2D = ['Product A', 'Product B'];

    function make2DDatasets(type) {
      return data2D.map(function (d, i) {
        var color = chartColors[i];
        var ds = {
          label: series2D[i],
          data: d,
          borderColor: color,
          pointBackgroundColor: color,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: color
        };
        if (type === 'radar') {
          ds.backgroundColor = hexToRgba(color, 0.2);
        } else if (type === 'line') {
          ds.fill = false;
          ds.backgroundColor = 'transparent';
        } else if (type === 'bar') {
          ds.backgroundColor = color;
        }
        return ds;
      });
    }

    // Radar
    var radarCtx = document.getElementById('radar');
    if (radarCtx) {
      charts.push(new Chart(radarCtx, {
        type: 'radar',
        data: { labels: labels2D, datasets: make2DDatasets('radar') },
        options: {
          responsive: globalOpts.responsive,
          maintainAspectRatio: globalOpts.maintainAspectRatio,
          animation: globalOpts.animation,
          scale: {
            pointLabels: { fontColor: layoutColors.defaultText },
            ticks: { maxTicksLimit: 5, display: false },
            gridLines: { color: layoutColors.border }
          }
        }
      }));
    }

    // Line
    var lineCtx = document.getElementById('line');
    if (lineCtx) {
      charts.push(new Chart(lineCtx, {
        type: 'line',
        data: { labels: labels2D, datasets: make2DDatasets('line') },
        options: {
          responsive: globalOpts.responsive,
          maintainAspectRatio: globalOpts.maintainAspectRatio,
          animation: globalOpts.animation,
          scales: {
            xAxes: [{
              gridLines: { color: layoutColors.border },
              ticks: { fontColor: layoutColors.defaultText }
            }],
            yAxes: [{
              gridLines: { color: layoutColors.border },
              ticks: { fontColor: layoutColors.defaultText }
            }]
          }
        }
      }));
    }

    // Bar
    var barCtx = document.getElementById('bar');
    if (barCtx) {
      charts.push(new Chart(barCtx, {
        type: 'bar',
        data: { labels: labels2D, datasets: make2DDatasets('bar') },
        options: {
          responsive: globalOpts.responsive,
          maintainAspectRatio: globalOpts.maintainAspectRatio,
          animation: globalOpts.animation,
          tooltips: { enabled: false },
          scales: {
            xAxes: [{
              gridLines: { color: layoutColors.border },
              ticks: { fontColor: layoutColors.defaultText }
            }],
            yAxes: [{
              gridLines: { color: layoutColors.border },
              ticks: { fontColor: layoutColors.defaultText }
            }]
          }
        }
      }));
    }

    chartsRef.current = charts;

    return function () {
      intervalsRef.current.forEach(function (id) { clearInterval(id); });
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
      charts.forEach(function (c) { c.destroy(); });
    };
  }, []);

  return React.createElement('div', null,
    // Row 1: Pie, Doughnut, Polar
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
    // Row 2: Animated Radar, Animated Bars
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
    // Row 3: Radar, Line, Bars
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
