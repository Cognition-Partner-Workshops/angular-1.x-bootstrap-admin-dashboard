import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

export function MorrisPage({ baConfig }) {
  var layoutColors = baConfig.colors;
  var lineRef = useRef(null);
  var donutRef = useRef(null);
  var barRef = useRef(null);
  var areaRef = useRef(null);

  var colors = [
    layoutColors.primary, layoutColors.warning, layoutColors.danger,
    layoutColors.info, layoutColors.success, layoutColors.primaryDark
  ];

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

  useEffect(function () {
    var Morris = window.Morris;
    if (!Morris) return;

    if (lineRef.current) {
      Morris.Line({
        element: lineRef.current,
        data: lineData,
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Serie A', 'Serie B'],
        lineColors: colors
      });
    }

    if (donutRef.current) {
      Morris.Donut({
        element: donutRef.current,
        data: donutData,
        colors: colors,
        formatter: function (y) { return '$' + y; }
      });
    }

    if (barRef.current) {
      Morris.Bar({
        element: barRef.current,
        data: barData,
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        barColors: colors
      });
    }

    if (areaRef.current) {
      Morris.Area({
        element: areaRef.current,
        data: areaData,
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Serie A', 'Serie B'],
        lineColors: colors
      });
    }

    return function () {
      [lineRef, donutRef, barRef, areaRef].forEach(function (ref) {
        if (ref.current) ref.current.innerHTML = '';
      });
    };
  }, []);

  return React.createElement('section', null,
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12' },
        React.createElement(Panel, { title: 'Line Chart', panelClass: 'with-scroll' },
          React.createElement('div', { 'line-chart': '', ref: lineRef })
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-4' },
        React.createElement(Panel, { title: 'Donut', panelClass: 'with-scroll' },
          React.createElement('div', { 'donut-chart': '', ref: donutRef })
        )
      ),
      React.createElement('div', { className: 'col-md-8' },
        React.createElement(Panel, { title: 'Bar Chart', panelClass: 'with-scroll' },
          React.createElement('div', { 'bar-chart': '', ref: barRef })
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-md-12' },
        React.createElement(Panel, { title: 'Area Chart', panelClass: 'with-scroll' },
          React.createElement('div', { 'area-chart': '', ref: areaRef })
        )
      )
    )
  );
}
