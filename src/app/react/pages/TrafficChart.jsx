/**
 * TrafficChart — React migration of the AngularJS `trafficChart` directive +
 * TrafficChartCtrl. Renders the "Acquisition Channels" doughnut (Chart.js) and
 * the channel legend with progress bars.
 */
import React, { useEffect, useRef } from 'react';

export function TrafficChart({ baConfig, colorHelper }) {
  var canvasRef = useRef(null);
  var chartRef = useRef(null);

  var transparent = baConfig.theme.blur;
  var dashboardColors = baConfig.colors.dashboard;

  var doughnutData = {
    labels: ['Other', 'Search engines', 'Referral Traffic', 'Direct Traffic', 'Ad Campaigns'],
    datasets: [
      {
        data: [2000, 1500, 1000, 1200, 400],
        backgroundColor: [
          dashboardColors.white,
          dashboardColors.blueStone,
          dashboardColors.surfieGreen,
          dashboardColors.silverTree,
          dashboardColors.gossip,
        ],
        hoverBackgroundColor: [
          colorHelper.shade(dashboardColors.white, 15),
          colorHelper.shade(dashboardColors.blueStone, 15),
          colorHelper.shade(dashboardColors.surfieGreen, 15),
          colorHelper.shade(dashboardColors.silverTree, 15),
          colorHelper.shade(dashboardColors.gossip, 15),
        ],
        percentage: [87, 22, 70, 38, 17],
      },
    ],
  };

  useEffect(function () {
    var Chart = window.Chart;
    if (!Chart || !canvasRef.current) {
      return undefined;
    }
    var ctx = canvasRef.current.getContext('2d');
    var doughnut = new Chart(ctx, {
      type: 'doughnut',
      data: doughnutData,
      options: {
        cutoutPercentage: 64,
        responsive: true,
        elements: { arc: { borderWidth: 0 } },
      },
    });
    chartRef.current = doughnut;
    window.myDoughnut = doughnut;

    return function () {
      if (chartRef.current && typeof chartRef.current.destroy === 'function') {
        chartRef.current.destroy();
      }
    };
  }, []);

  var dataset = doughnutData.datasets[0];

  return React.createElement(
    'div',
    { className: 'channels-block' + (transparent ? ' transparent' : '') },
    React.createElement('div', { className: 'chart-bg' }),
    React.createElement(
      'div',
      { className: 'traffic-chart', id: 'trafficChart' },
      React.createElement(
        'div',
        { className: 'canvas-holder' },
        React.createElement('canvas', { id: 'chart-area', width: 280, height: 280, ref: canvasRef }),
        React.createElement(
          'div',
          { className: 'traffic-text' },
          '1,900,128',
          React.createElement('span', null, 'Views Total')
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'channels-info' },
      React.createElement(
        'div',
        null,
        doughnutData.labels.map(function (label, i) {
          return React.createElement(
            'div',
            { className: 'channels-info-item', key: label },
            React.createElement('div', {
              className: 'legend-color',
              style: { backgroundColor: dataset.backgroundColor[i] },
            }),
            React.createElement(
              'p',
              null,
              label,
              React.createElement('span', { className: 'channel-number' }, '+' + dataset.percentage[i] + '%')
            ),
            React.createElement(
              'div',
              { className: 'progress progress-sm channel-progress' },
              React.createElement('div', {
                className: 'progress-bar',
                role: 'progressbar',
                'aria-valuenow': dataset.percentage[i],
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                style: { width: dataset.percentage[i] + '%' },
              })
            )
          );
        })
      )
    )
  );
}
