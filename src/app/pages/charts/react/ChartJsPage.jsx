import React, { useRef, useEffect } from 'react';
import Panel from './Panel';

function shuffle(arr) {
  var o = arr.slice();
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
  return o;
}

function ChartJs1D({ chartType, layoutColors }) {
  var canvasRef = useRef(null);
  var chartRef = useRef(null);
  var labels = ['Sleeping', 'Designing', 'Coding', 'Cycling'];
  var dataRef = useRef([20, 40, 5, 35]);

  useEffect(function () {
    if (!canvasRef.current || !window.Chart) return;
    var ctx = canvasRef.current.getContext('2d');
    var chartColors = [
      layoutColors.primary, layoutColors.danger, layoutColors.warning,
      layoutColors.success, layoutColors.info, layoutColors.default
    ];

    chartRef.current = new window.Chart(ctx, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [{ data: dataRef.current, backgroundColor: chartColors }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 2500 },
        elements: { arc: { borderWidth: 0 } },
        legend: {
          display: true,
          position: 'bottom',
          labels: { fontColor: layoutColors.defaultText }
        }
      }
    });

    return function () {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, []);

  function handleClick() {
    if (!chartRef.current) return;
    dataRef.current = shuffle(dataRef.current);
    chartRef.current.data.datasets[0].data = dataRef.current;
    chartRef.current.update();
  }

  return (
    <div className="chartjs-canvas-holder-first-row">
      <canvas ref={canvasRef} onClick={handleClick}></canvas>
    </div>
  );
}

function ChartJsWave({ chartType, layoutColors }) {
  var canvasRef = useRef(null);
  var chartRef = useRef(null);

  useEffect(function () {
    if (!canvasRef.current || !window.Chart) return;
    var ctx = canvasRef.current.getContext('2d');
    var chartColors = [
      layoutColors.primary, layoutColors.danger, layoutColors.warning,
      layoutColors.success, layoutColors.info, layoutColors.default
    ];
    var labels = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var data = [1, 9, 3, 4, 5, 6, 7, 8, 2].map(function (e) {
      return Math.sin(e) * 25 + 25;
    });

    chartRef.current = new window.Chart(ctx, {
      type: chartType,
      data: {
        labels: labels,
        datasets: [{ data: data, backgroundColor: chartColors[0], borderColor: chartColors[0], fill: false }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 2500 },
        legend: { display: false }
      }
    });

    var interval = setInterval(function () {
      if (!chartRef.current) return;
      var ds = chartRef.current.data.datasets[0].data;
      var last = ds[ds.length - 1];
      for (var i = ds.length - 1; i > 0; i--) {
        ds[i] = ds[i - 1];
      }
      ds[0] = last;
      chartRef.current.update();
    }, 400);

    return function () {
      clearInterval(interval);
      if (chartRef.current) chartRef.current.destroy();
    };
  }, []);

  return (
    <div className="chartjs-canvas-holder-second-row">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

function ChartJs2D({ chartType, layoutColors }) {
  var canvasRef = useRef(null);
  var chartRef = useRef(null);

  useEffect(function () {
    if (!canvasRef.current || !window.Chart) return;
    var ctx = canvasRef.current.getContext('2d');
    var chartColors = [
      layoutColors.primary, layoutColors.danger, layoutColors.warning,
      layoutColors.success, layoutColors.info, layoutColors.default
    ];
    var labels = ['May', 'Jun', 'Jul', 'Aug', 'Sep'];
    var data = [
      [65, 59, 90, 81, 56],
      [28, 48, 40, 19, 88]
    ];
    var series = ['Product A', 'Product B'];

    var datasets = data.map(function (d, i) {
      return {
        label: series[i],
        data: d,
        backgroundColor: chartColors[i],
        borderColor: chartColors[i],
        fill: false
      };
    });

    var scaleOpts = {};
    if (chartType === 'radar') {
      scaleOpts = {
        scale: {
          pointLabels: { fontColor: layoutColors.defaultText },
          ticks: { maxTicksLimit: 5, display: false },
          gridLines: { color: layoutColors.border }
        }
      };
    } else {
      scaleOpts = {
        scales: {
          xAxes: [{ gridLines: { color: layoutColors.border }, ticks: { fontColor: layoutColors.defaultText } }],
          yAxes: [{ gridLines: { color: layoutColors.border }, ticks: { fontColor: layoutColors.defaultText } }]
        }
      };
    }

    chartRef.current = new window.Chart(ctx, {
      type: chartType,
      data: { labels: labels, datasets: datasets },
      options: Object.assign({
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 2500 },
        legend: { labels: { fontColor: layoutColors.defaultText } }
      }, scaleOpts)
    });

    return function () {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, []);

  function handleClick() {
    if (!chartRef.current) return;
    chartRef.current.data.datasets.forEach(function (ds) {
      ds.data = shuffle(ds.data);
    });
    chartRef.current.update();
  }

  return (
    <div className="chartjs-canvas-holder-third-row">
      <canvas ref={canvasRef} onClick={handleClick}></canvas>
    </div>
  );
}

function ChartJsPage({ baConfig }) {
  var layoutColors = baConfig ? baConfig.colors : {};
  var blur = baConfig ? baConfig.theme.blur : false;

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <Panel title="Pie" panelClass="with-scroll" blur={blur}>
            <ChartJs1D chartType="pie" layoutColors={layoutColors} />
          </Panel>
        </div>
        <div className="col-md-4">
          <Panel title="Doughnut" panelClass="with-scroll" blur={blur}>
            <ChartJs1D chartType="doughnut" layoutColors={layoutColors} />
          </Panel>
        </div>
        <div className="col-md-4">
          <Panel title="Polar" panelClass="with-scroll" blur={blur}>
            <ChartJs1D chartType="polarArea" layoutColors={layoutColors} />
          </Panel>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Panel title="Animated Radar" panelClass="col-eq-height" blur={blur}>
            <ChartJsWave chartType="radar" layoutColors={layoutColors} />
          </Panel>
        </div>
        <div className="col-md-6">
          <Panel title="Animated Bars" panelClass="col-eq-height" blur={blur}>
            <ChartJsWave chartType="bar" layoutColors={layoutColors} />
          </Panel>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-6">
          <Panel title="Radar" panelClass="with-scroll" blur={blur}>
            <ChartJs2D chartType="radar" layoutColors={layoutColors} />
          </Panel>
        </div>
        <div className="col-lg-4 col-md-6">
          <Panel title="Line" panelClass="with-scroll" blur={blur}>
            <ChartJs2D chartType="line" layoutColors={layoutColors} />
          </Panel>
        </div>
        <div className="col-lg-4 col-md-12">
          <Panel title="Bars" panelClass="with-scroll" blur={blur}>
            <ChartJs2D chartType="bar" layoutColors={layoutColors} />
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default ChartJsPage;
