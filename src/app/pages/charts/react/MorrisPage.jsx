import React, { useEffect, useRef } from 'react';
import Panel from './Panel';

function MorrisLineChart({ data, xkey, ykeys, labels, colors }) {
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current || !window.Morris) return;
    var chart = new Morris.Line({
      element: ref.current,
      data: data,
      xkey: xkey,
      ykeys: ykeys,
      labels: labels,
      lineColors: colors,
      resize: true
    });
    return function () { if (chart && chart.el) chart.el.empty(); };
  }, []);

  return <div ref={ref}></div>;
}

function MorrisDonutChart({ data, colors }) {
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current || !window.Morris) return;
    var chart = new Morris.Donut({
      element: ref.current,
      data: data,
      colors: colors,
      formatter: function (y) { return '$' + y; },
      resize: true
    });
    return function () { if (chart && chart.el) chart.el.empty(); };
  }, []);

  return <div ref={ref}></div>;
}

function MorrisBarChart({ data, x, y, labels, colors }) {
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current || !window.Morris) return;
    var chart = new Morris.Bar({
      element: ref.current,
      data: data,
      xkey: x,
      ykeys: y,
      labels: labels,
      barColors: colors,
      resize: true
    });
    return function () { if (chart && chart.el) chart.el.empty(); };
  }, []);

  return <div ref={ref}></div>;
}

function MorrisAreaChart({ data, xkey, ykeys, labels, colors }) {
  var ref = useRef(null);

  useEffect(function () {
    if (!ref.current || !window.Morris) return;
    var chart = new Morris.Area({
      element: ref.current,
      data: data,
      xkey: xkey,
      ykeys: ykeys,
      labels: labels,
      lineColors: colors,
      resize: true
    });
    return function () { if (chart && chart.el) chart.el.empty(); };
  }, []);

  return <div ref={ref}></div>;
}

function MorrisPage() {
  var layoutColors = window.baConfig ? window.baConfig.colors : {};
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

  var areaData = [
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

  var donutData = [
    { label: 'Download Sales', value: 12 },
    { label: 'In-Store Sales', value: 30 },
    { label: 'Mail-Order Sales', value: 20 }
  ];

  return (
    <section>
      <div className="row">
        <div className="col-md-12">
          <Panel title="Line Chart" panelClass="with-scroll">
            <MorrisLineChart data={lineData} xkey="y" ykeys={['a', 'b']} labels={['Serie A', 'Serie B']} colors={colors} />
          </Panel>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <Panel title="Donut" panelClass="with-scroll">
            <MorrisDonutChart data={donutData} colors={colors} />
          </Panel>
        </div>
        <div className="col-md-8">
          <Panel title="Bar Chart" panelClass="with-scroll">
            <MorrisBarChart data={barData} x="y" y={['a', 'b']} labels={['Series A', 'Series B']} colors={colors} />
          </Panel>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Panel title="Area Chart" panelClass="with-scroll">
            <MorrisAreaChart data={areaData} xkey="y" ykeys={['a', 'b']} labels={['Serie A', 'Serie B']} colors={colors} />
          </Panel>
        </div>
      </div>
    </section>
  );
}

export default MorrisPage;
