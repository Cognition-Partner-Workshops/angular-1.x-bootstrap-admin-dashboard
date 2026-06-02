import React, { useEffect } from 'react';
import { Panel } from '../components/Panel';

var simpleLineData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  series: [
    [20, 20, 12, 45, 50],
    [10, 45, 30, 14, 12],
    [34, 12, 12, 40, 50],
    [10, 43, 25, 22, 16],
    [3, 6, 30, 33, 43]
  ]
};

var simpleLineOptions = {
  fullWidth: true,
  height: '300px',
  chartPadding: { right: 40 }
};

var areaLineData = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  series: [[5, 9, 7, 8, 5, 3, 5, 4]]
};

var areaLineOptions = {
  fullWidth: true,
  height: '300px',
  low: 0,
  showArea: true
};

var biLineData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    [1, 2, 3, 1, -2, 0, 1],
    [-2, -1, -2, -1, -2.5, -1, -2],
    [0, 0, 0, 1, 2, 2.5, 2],
    [2.5, 2, 1, 0.5, 1, 0.5, -1]
  ]
};

var biLineOptions = {
  height: '300px',
  high: 3,
  low: -3,
  showArea: true,
  showLine: false,
  showPoint: false,
  fullWidth: true,
  axisX: { showGrid: false }
};

var simpleBarData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    [15, 24, 43, 27, 5, 10, 23, 44, 68, 50, 26, 8],
    [13, 22, 49, 22, 4, 6, 24, 46, 57, 48, 22, 4]
  ]
};

var simpleBarOptions = {
  fullWidth: true,
  height: '300px'
};

var multiBarData = {
  labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
  series: [
    [5, 4, 3, 7],
    [3, 2, 9, 5],
    [1, 5, 8, 4],
    [2, 3, 4, 6],
    [4, 1, 2, 1]
  ]
};

var multiBarOptions = {
  fullWidth: true,
  height: '300px',
  stackBars: true,
  axisX: {
    labelInterpolationFnc: function (value) {
      return value.split(/\s+/).map(function (word) {
        return word[0];
      }).join('');
    }
  },
  axisY: { offset: 20 }
};

var multiBarResponsive = [
  ['screen and (min-width: 400px)', {
    reverseData: true,
    horizontalBars: true,
    axisX: { labelInterpolationFnc: function () { return ''; } },
    axisY: { offset: 60 }
  }],
  ['screen and (min-width: 700px)', {
    stackBars: false,
    reverseData: false,
    horizontalBars: false,
    seriesBarDistance: 15
  }]
];

var stackedBarData = {
  labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
  series: [
    [800000, 1200000, 1400000, 1300000],
    [200000, 400000, 500000, 300000],
    [100000, 200000, 400000, 600000]
  ]
};

var stackedBarOptions = {
  fullWidth: true,
  height: '300px',
  stackBars: true,
  axisY: {
    labelInterpolationFnc: function (value) {
      return (value / 1000) + 'k';
    }
  }
};

var simplePieData = { series: [5, 3, 4] };
var simplePieOptions = {
  fullWidth: true,
  height: '300px',
  weight: '300px',
  labelInterpolationFnc: function (value) {
    return Math.round(value / 12 * 100) + '%';
  }
};

var labelsPieData = { labels: ['Bananas', 'Apples', 'Grapes'], series: [20, 15, 40] };
var labelsPieOptions = {
  fullWidth: true,
  height: '300px',
  weight: '300px',
  labelDirection: 'explode',
  labelInterpolationFnc: function (value) {
    return value[0];
  }
};

var simpleDonutData = { labels: ['Bananas', 'Apples', 'Grapes'], series: [20, 15, 40] };
var simpleDonutOptions = {
  fullWidth: true,
  donut: true,
  height: '300px',
  weight: '300px',
  labelDirection: 'explode',
  labelInterpolationFnc: function (value) {
    return value[0];
  }
};

function getResponsive(padding, offset) {
  return [
    ['screen and (min-width: 1550px)', {
      chartPadding: padding,
      labelOffset: offset,
      labelDirection: 'explode',
      labelInterpolationFnc: function (value) { return value; }
    }],
    ['screen and (max-width: 1200px)', {
      chartPadding: padding,
      labelOffset: offset,
      labelDirection: 'explode',
      labelInterpolationFnc: function (value) { return value; }
    }],
    ['screen and (max-width: 600px)', {
      chartPadding: 0,
      labelOffset: 0,
      labelInterpolationFnc: function (value) { return value[0]; }
    }]
  ];
}

var donutResponsive = getResponsive(5, 40);
var pieResponsive = getResponsive(20, 80);

export function ChartistPage() {
  useEffect(function () {
    if (typeof Chartist === 'undefined') return;

    setTimeout(function () {
      new Chartist.Line('#line-chart', simpleLineData, simpleLineOptions);
      new Chartist.Line('#area-chart', areaLineData, areaLineOptions);
      new Chartist.Line('#bi-chart', biLineData, biLineOptions);

      new Chartist.Bar('#simple-bar', simpleBarData, simpleBarOptions);
      new Chartist.Bar('#multi-bar', multiBarData, multiBarOptions, multiBarResponsive);
      new Chartist.Bar('#stacked-bar', stackedBarData, stackedBarOptions);

      new Chartist.Pie('#simple-pie', simplePieData, simplePieOptions, pieResponsive);
      new Chartist.Pie('#label-pie', labelsPieData, labelsPieOptions);
      new Chartist.Pie('#donut', simpleDonutData, simpleDonutOptions, donutResponsive);
    }, 0);
  }, []);

  return React.createElement('section', { className: 'chartist' },
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-6' },
        React.createElement(Panel, { title: 'Lines', panelClass: 'with-scroll' },
          React.createElement('h5', null, 'Simple line chart'),
          React.createElement('div', { id: 'line-chart', className: 'ct-chart' }),
          React.createElement('h5', null, 'Line chart with area'),
          React.createElement('div', { id: 'area-chart', className: 'ct-chart' }),
          React.createElement('h5', null, 'Bi-polar line chart with area only'),
          React.createElement('div', { id: 'bi-chart', className: 'ct-chart' })
        )
      ),
      React.createElement('div', { className: 'col-md-6' },
        React.createElement(Panel, { title: 'Bars', panelClass: 'with-scroll' },
          React.createElement('h5', null, 'Simple bar chart'),
          React.createElement('div', { id: 'simple-bar', className: 'ct-chart' }),
          React.createElement('h5', null, 'Multi-line labels bar chart'),
          React.createElement('div', { id: 'multi-bar', className: 'ct-chart' }),
          React.createElement('h5', null, 'Stacked bar chart'),
          React.createElement('div', { id: 'stacked-bar', className: 'ct-chart stacked-bar' })
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12' },
        React.createElement(Panel, { title: 'Pies & Donuts', panelClass: 'with-scroll' },
          React.createElement('div', { className: 'row' },
            React.createElement('div', { className: 'col-md-12 col-lg-4' },
              React.createElement('h5', null, 'Simple Pie'),
              React.createElement('div', { id: 'simple-pie', className: 'ct-chart' })
            ),
            React.createElement('div', { className: 'col-md-12 col-lg-4' },
              React.createElement('h5', null, 'Pie with labels'),
              React.createElement('div', { id: 'label-pie', className: 'ct-chart' })
            ),
            React.createElement('div', { className: 'col-md-12 col-lg-4' },
              React.createElement('h5', null, 'Donut'),
              React.createElement('div', { id: 'donut', className: 'ct-chart' })
            )
          )
        )
      )
    )
  );
}
