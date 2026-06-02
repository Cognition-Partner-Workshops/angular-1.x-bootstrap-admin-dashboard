/**
 * MorrisPage — React port of the AngularJS `charts.morris` page.
 *
 * Replaces app/pages/charts/morris/morris.html and morrisCtrl, plus the
 * angular-morris-chart directives (line/donut/bar/area). Charts are created
 * against the global Morris library. The original directive attributes
 * (`line-chart`, `donut-chart`, `bar-chart`, `area-chart`) are preserved on the
 * container divs since the E2E suite selects on them.
 */
import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

function currencyFormatter(value) {
  return '$' + Number(value).toFixed(2);
}

export function MorrisPage({ baConfig }) {
  var layoutColors = baConfig.colors;
  var refs = useRef({});

  useEffect(function () {
    var Morris = window.Morris;
    if (!Morris) {
      return undefined;
    }

    var colors = [
      layoutColors.primary,
      layoutColors.warning,
      layoutColors.danger,
      layoutColors.info,
      layoutColors.success,
      layoutColors.primaryDark
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
    var areaData = lineData.map(function (d) { return d; });
    var barData = lineData.map(function (d) { return d; });
    var donutData = [
      { label: 'Download Sales', value: 12 },
      { label: 'In-Store Sales', value: 30 },
      { label: 'Mail-Order Sales', value: 20 }
    ];

    Morris.Line({
      element: refs.current.line,
      data: lineData,
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Serie A', 'Serie B'],
      lineColors: colors
    });

    Morris.Donut({
      element: refs.current.donut,
      data: donutData,
      colors: colors,
      formatter: currencyFormatter
    });

    Morris.Bar({
      element: refs.current.bar,
      data: barData,
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series A', 'Series B'],
      barColors: colors,
      stacked: false,
      resize: false,
      xLabelMargin: 2
    });

    Morris.Area({
      element: refs.current.area,
      data: areaData,
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Serie A', 'Serie B'],
      lineColors: colors
    });

    return function () {
      ['line', 'donut', 'bar', 'area'].forEach(function (key) {
        var node = refs.current[key];
        if (node) {
          node.innerHTML = '';
        }
      });
    };
  }, []);

  function setRef(key) {
    return function (node) {
      refs.current[key] = node;
    };
  }

  return (
    <section>
      <div className="row">
        <div className="col-md-12">
          <Panel title="Line Chart" panelClass="with-scroll">
            <div line-chart="" ref={setRef('line')} />
          </Panel>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <Panel title="Donut" panelClass="with-scroll">
            <div donut-chart="" ref={setRef('donut')} />
          </Panel>
        </div>
        <div className="col-md-8">
          <Panel title="Bar Chart" panelClass="with-scroll ">
            <div bar-chart="" ref={setRef('bar')} />
          </Panel>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Panel title="Area Chart" panelClass="with-scroll">
            <div area-chart="" ref={setRef('area')} />
          </Panel>
        </div>
      </div>
    </section>
  );
}
