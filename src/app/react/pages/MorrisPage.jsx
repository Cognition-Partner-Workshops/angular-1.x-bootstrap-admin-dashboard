/**
 * MorrisPage — React migration of src/app/pages/charts/morris.
 *
 * Replaces morris.html + morrisCtrl and the angular-morris-chart directives
 * (line-chart, donut-chart, bar-chart, area-chart). Charts are drawn with the
 * global Morris library. The original directive attributes (line-chart, etc.) are
 * preserved on the container divs because the E2E tests select on them.
 *
 * baConfig is injected by the AngularJS bridge directive and passed in as a prop.
 */
import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

var SERIES_DATA = [
  { y: '2006', a: 100, b: 90 },
  { y: '2007', a: 75, b: 65 },
  { y: '2008', a: 50, b: 40 },
  { y: '2009', a: 75, b: 65 },
  { y: '2010', a: 50, b: 40 },
  { y: '2011', a: 75, b: 65 },
  { y: '2012', a: 100, b: 90 }
];

var DONUT_DATA = [
  { label: 'Download Sales', value: 12 },
  { label: 'In-Store Sales', value: 30 },
  { label: 'Mail-Order Sales', value: 20 }
];

function currencyFormatter(value) {
  return '$' + Number(value).toFixed(2);
}

export function MorrisPage({ baConfig }) {
  var layoutColors = (baConfig && baConfig.colors) || {};
  var colors = [
    layoutColors.primary, layoutColors.warning, layoutColors.danger,
    layoutColors.info, layoutColors.success, layoutColors.primaryDark
  ];

  var lineRef = useRef(null);
  var donutRef = useRef(null);
  var barRef = useRef(null);
  var areaRef = useRef(null);

  useEffect(function () {
    var Morris = window.Morris;
    if (!Morris) {
      return undefined;
    }

    Morris.Line({
      element: lineRef.current,
      data: SERIES_DATA,
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Serie A', 'Serie B'],
      lineColors: colors
    });

    Morris.Donut({
      element: donutRef.current,
      data: DONUT_DATA,
      colors: colors,
      formatter: currencyFormatter
    });

    Morris.Bar({
      element: barRef.current,
      data: SERIES_DATA,
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series A', 'Series B'],
      barColors: colors,
      stacked: false,
      resize: false,
      xLabelMargin: 2
    });

    Morris.Area({
      element: areaRef.current,
      data: SERIES_DATA,
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Serie A', 'Serie B'],
      lineColors: colors
    });

    return function () {
      [lineRef, donutRef, barRef, areaRef].forEach(function (ref) {
        if (ref.current) {
          ref.current.innerHTML = '';
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="row">
        <div className="col-md-12">
          <Panel title="Line Chart" panelClass="with-scroll">
            <div line-chart="" ref={lineRef}></div>
          </Panel>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <Panel title="Donut" panelClass="with-scroll">
            <div donut-chart="" ref={donutRef}></div>
          </Panel>
        </div>
        <div className="col-md-8">
          <Panel title="Bar Chart" panelClass="with-scroll ">
            <div bar-chart="" ref={barRef}></div>
          </Panel>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Panel title="Area Chart" panelClass="with-scroll">
            <div area-chart="" ref={areaRef}></div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
