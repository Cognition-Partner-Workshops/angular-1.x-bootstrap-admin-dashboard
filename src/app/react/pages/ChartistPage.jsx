/**
 * ChartistPage — React migration of src/app/pages/charts/chartist.
 *
 * Replaces chartist.html + chartistCtrl. Charts are drawn with the global Chartist
 * library onto the container divs (ids/classes preserved from the original template).
 *
 * baConfig is injected by the AngularJS bridge directive and passed in as a prop.
 */
import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

export function ChartistPage({ baConfig }) {
  var layoutColors = (baConfig && baConfig.colors) || {};

  var lineRef = useRef(null);
  var areaRef = useRef(null);
  var biRef = useRef(null);
  var simpleBarRef = useRef(null);
  var multiBarRef = useRef(null);
  var stackedBarRef = useRef(null);
  var simplePieRef = useRef(null);
  var labelPieRef = useRef(null);
  var donutRef = useRef(null);

  useEffect(function () {
    var Chartist = window.Chartist;
    if (!Chartist) {
      return undefined;
    }

    var charts = [];

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

    charts.push(new Chartist.Line(lineRef.current, {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      series: [
        [20, 20, 12, 45, 50],
        [10, 45, 30, 14, 12],
        [34, 12, 12, 40, 50],
        [10, 43, 25, 22, 16],
        [3, 6, 30, 33, 43]
      ]
    }, {
      color: layoutColors.defaultText,
      fullWidth: true,
      height: '300px',
      chartPadding: { right: 40 }
    }));

    charts.push(new Chartist.Line(areaRef.current, {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
      series: [[5, 9, 7, 8, 5, 3, 5, 4]]
    }, {
      fullWidth: true,
      height: '300px',
      low: 0,
      showArea: true
    }));

    charts.push(new Chartist.Line(biRef.current, {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [
        [1, 2, 3, 1, -2, 0, 1],
        [-2, -1, -2, -1, -2.5, -1, -2],
        [0, 0, 0, 1, 2, 2.5, 2],
        [2.5, 2, 1, 0.5, 1, 0.5, -1]
      ]
    }, {
      height: '300px',
      high: 3,
      low: -3,
      showArea: true,
      showLine: false,
      showPoint: false,
      fullWidth: true,
      axisX: { showGrid: false }
    }));

    charts.push(new Chartist.Bar(simpleBarRef.current, {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [15, 24, 43, 27, 5, 10, 23, 44, 68, 50, 26, 8],
        [13, 22, 49, 22, 4, 6, 24, 46, 57, 48, 22, 4]
      ]
    }, {
      fullWidth: true,
      height: '300px'
    }));

    charts.push(new Chartist.Bar(multiBarRef.current, {
      labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
      series: [
        [5, 4, 3, 7],
        [3, 2, 9, 5],
        [1, 5, 8, 4],
        [2, 3, 4, 6],
        [4, 1, 2, 1]
      ]
    }, {
      fullWidth: true,
      height: '300px',
      stackBars: true,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value.split(/\s+/).map(function (word) { return word[0]; }).join('');
        }
      },
      axisY: { offset: 20 }
    }, [
      ['screen and (min-width: 400px)', {
        reverseData: true,
        horizontalBars: true,
        axisX: { labelInterpolationFnc: Chartist.noop },
        axisY: { offset: 60 }
      }],
      ['screen and (min-width: 700px)', {
        stackBars: false,
        reverseData: false,
        horizontalBars: false,
        seriesBarDistance: 15
      }]
    ]));

    charts.push(new Chartist.Bar(stackedBarRef.current, {
      labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
      series: [
        [800000, 1200000, 1400000, 1300000],
        [200000, 400000, 500000, 300000],
        [100000, 200000, 400000, 600000]
      ]
    }, {
      fullWidth: true,
      height: '300px',
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function (value) { return (value / 1000) + 'k'; }
      }
    }));

    charts.push(new Chartist.Pie(simplePieRef.current, {
      series: [5, 3, 4]
    }, {
      fullWidth: true,
      height: '300px',
      weight: '300px',
      labelInterpolationFnc: function (value) {
        return Math.round(value / 12 * 100) + '%';
      }
    }, getResponsive(20, 80)));

    charts.push(new Chartist.Pie(labelPieRef.current, {
      labels: ['Bananas', 'Apples', 'Grapes'],
      series: [20, 15, 40]
    }, {
      fullWidth: true,
      height: '300px',
      weight: '300px',
      labelDirection: 'explode',
      labelInterpolationFnc: function (value) { return value[0]; }
    }));

    charts.push(new Chartist.Pie(donutRef.current, {
      labels: ['Bananas', 'Apples', 'Grapes'],
      series: [20, 15, 40]
    }, {
      fullWidth: true,
      donut: true,
      height: '300px',
      weight: '300px',
      labelDirection: 'explode',
      labelInterpolationFnc: function (value) { return value[0]; }
    }, getResponsive(5, 40)));

    return function () {
      charts.forEach(function (chart) {
        if (chart && typeof chart.detach === 'function') {
          chart.detach();
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="chartist">
      <div className="row">
        <div className="col-md-6 ">
          <Panel title="Lines" panelClass="with-scroll ">
            <h5>Simple line chart</h5>
            <div id="line-chart" className="ct-chart" ref={lineRef}></div>
            <h5>Line chart with area</h5>
            <div id="area-chart" className="ct-chart" ref={areaRef}></div>
            <h5>Bi-polar line chart with area only</h5>
            <div id="bi-chart" className="ct-chart" ref={biRef}></div>
          </Panel>
        </div>

        <div className="col-md-6 ">
          <Panel title="Bars" panelClass="with-scroll ">
            <h5>Simple bar chart</h5>
            <div id="simple-bar" className="ct-chart" ref={simpleBarRef}></div>
            <h5>Multi-line labels bar chart</h5>
            <div id="multi-bar" className="ct-chart" ref={multiBarRef}></div>
            <h5>Stacked bar chart</h5>
            <div id="stacked-bar" className="ct-chart stacked-bar" ref={stackedBarRef}></div>
          </Panel>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <Panel title="Pies & Donuts" panelClass="with-scroll ">
            <div className="row">
              <div className="col-md-12 col-lg-4">
                <h5>Simple Pie</h5>
                <div id="simple-pie" className="ct-chart" ref={simplePieRef}></div>
              </div>
              <div className="col-md-12 col-lg-4">
                <h5>Pie with labels</h5>
                <div id="label-pie" className="ct-chart" ref={labelPieRef}></div>
              </div>
              <div className="col-md-12 col-lg-4">
                <h5>Donut</h5>
                <div id="donut" className="ct-chart" ref={donutRef}></div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
