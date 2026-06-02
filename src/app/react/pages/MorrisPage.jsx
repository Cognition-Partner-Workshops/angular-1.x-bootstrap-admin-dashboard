import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';
import { colorHelper } from '../utils/colorHelper';

var colorScheme = {
  primary: '#209e91',
  info: '#2dacd1',
  success: '#90b900',
  warning: '#dfb81c',
  danger: '#e85656',
};

var layoutColors = {
  defaultText: '#666666',
  borderDark: '#aaaaaa',
  primary: colorScheme.primary,
  warning: colorScheme.warning,
  danger: colorScheme.danger,
  info: colorScheme.info,
  success: colorScheme.success,
  primaryDark: colorHelper.shade(colorScheme.primary, 15),
};

var morrisColors = [layoutColors.primary, layoutColors.warning, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.primaryDark];

var lineData = [
  { y: '2006', a: 100, b: 90 },
  { y: '2007', a: 75, b: 65 },
  { y: '2008', a: 50, b: 40 },
  { y: '2009', a: 75, b: 65 },
  { y: '2010', a: 50, b: 40 },
  { y: '2011', a: 75, b: 65 },
  { y: '2012', a: 100, b: 90 }
];

var barData = [
  { y: '2006', a: 100, b: 90 },
  { y: '2007', a: 75, b: 65 },
  { y: '2008', a: 50, b: 40 },
  { y: '2009', a: 75, b: 65 },
  { y: '2010', a: 50, b: 40 },
  { y: '2011', a: 75, b: 65 },
  { y: '2012', a: 100, b: 90 }
];

var areaData = [
  { y: '2006', a: 100, b: 90 },
  { y: '2007', a: 75, b: 65 },
  { y: '2008', a: 50, b: 40 },
  { y: '2009', a: 75, b: 65 },
  { y: '2010', a: 50, b: 40 },
  { y: '2011', a: 75, b: 65 },
  { y: '2012', a: 100, b: 90 }
];

var donutData = [
  { label: 'Download Sales', value: 12 },
  { label: 'In-Store Sales', value: 30 },
  { label: 'Mail-Order Sales', value: 20 }
];

export function MorrisPage() {
  var lineRef = useRef(null);
  var donutRef = useRef(null);
  var barRef = useRef(null);
  var areaRef = useRef(null);

  useEffect(function () {
    if (typeof Morris === 'undefined') return;

    Morris.Donut.prototype.defaults.backgroundColor = 'transparent';
    Morris.Donut.prototype.defaults.labelColor = layoutColors.defaultText;
    Morris.Grid.prototype.gridDefaults.gridLineColor = layoutColors.borderDark;
    Morris.Grid.prototype.gridDefaults.gridTextColor = layoutColors.defaultText;

    if (lineRef.current) {
      new Morris.Line({
        element: lineRef.current,
        data: lineData,
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Serie A', 'Serie B'],
        lineColors: morrisColors
      });
    }

    if (donutRef.current) {
      new Morris.Donut({
        element: donutRef.current,
        data: donutData,
        colors: morrisColors,
        formatter: function (y) { return '$' + y; }
      });
    }

    if (barRef.current) {
      new Morris.Bar({
        element: barRef.current,
        data: barData,
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        barColors: morrisColors
      });
    }

    if (areaRef.current) {
      new Morris.Area({
        element: areaRef.current,
        data: areaData,
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Serie A', 'Serie B'],
        lineColors: morrisColors
      });
    }

    return function () {
      [lineRef, donutRef, barRef, areaRef].forEach(function (ref) {
        if (ref.current) { ref.current.innerHTML = ''; }
      });
    };
  }, []);

  return React.createElement('section', null,
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12' },
        React.createElement(Panel, { title: 'Line Chart', panelClass: 'with-scroll' },
          React.createElement('div', { ref: lineRef, 'line-chart': '', 'line-data': JSON.stringify(lineData), 'line-xkey': 'y', 'line-ykeys': '["a", "b"]', 'line-labels': '["Serie A", "Serie B"]', 'line-colors': JSON.stringify(morrisColors) })
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-4' },
        React.createElement(Panel, { title: 'Donut', panelClass: 'with-scroll' },
          React.createElement('div', { ref: donutRef, 'donut-chart': '', 'donut-data': JSON.stringify(donutData), 'donut-colors': JSON.stringify(morrisColors), 'donut-formatter': '"currency"' })
        )
      ),
      React.createElement('div', { className: 'col-md-8' },
        React.createElement(Panel, { title: 'Bar Chart', panelClass: 'with-scroll' },
          React.createElement('div', { ref: barRef, 'bar-chart': '', 'bar-data': JSON.stringify(barData), 'bar-x': 'y', 'bar-y': '["a", "b"]', 'bar-labels': '["Series A", "Series B"]', 'bar-colors': JSON.stringify(morrisColors) })
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12' },
        React.createElement(Panel, { title: 'Area Chart', panelClass: 'with-scroll' },
          React.createElement('div', { ref: areaRef, 'area-chart': '', 'area-data': JSON.stringify(areaData), 'area-xkey': 'y', 'area-ykeys': '["a", "b"]', 'area-labels': '["Serie A", "Serie B"]', 'line-colors': JSON.stringify(morrisColors) })
        )
      )
    )
  );
}
