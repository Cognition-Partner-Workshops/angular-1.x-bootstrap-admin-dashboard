/**
 * TrafficChart — React port of the AngularJS traffic-chart directive
 * (TrafficChartCtrl + trafficChart.html). The "Acquisition Channels" widget.
 *
 * Renders a Chart.js doughnut into #chart-area plus the channel legend.
 */
import React, { useRef, useEffect } from 'react';
import { colorHelper } from '../utils/colorHelper';

export function TrafficChart({ baConfig }) {
  var transparent = baConfig.theme.blur;
  var dashboardColors = baConfig.colors.dashboard;

  var labels = ['Other', 'Search engines', 'Referral Traffic', 'Direct Traffic', 'Ad Campaigns'];
  var backgroundColor = [
    dashboardColors.white,
    dashboardColors.blueStone,
    dashboardColors.surfieGreen,
    dashboardColors.silverTree,
    dashboardColors.gossip,
  ];
  var percentage = [87, 22, 70, 38, 17];

  var chartRef = useRef(null);

  useEffect(function () {
    var Chart = window.Chart;
    var canvas = document.getElementById('chart-area');
    if (!Chart || !canvas) {
      return undefined;
    }

    var ctx = canvas.getContext('2d');
    var doughnutData = {
      labels: labels,
      datasets: [{
        data: [2000, 1500, 1000, 1200, 400],
        backgroundColor: backgroundColor,
        hoverBackgroundColor: [
          colorHelper.shade(dashboardColors.white, 15),
          colorHelper.shade(dashboardColors.blueStone, 15),
          colorHelper.shade(dashboardColors.surfieGreen, 15),
          colorHelper.shade(dashboardColors.silverTree, 15),
          colorHelper.shade(dashboardColors.gossip, 15),
        ],
        percentage: percentage,
      }],
    };

    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: doughnutData,
      options: {
        cutoutPercentage: 64,
        responsive: true,
        elements: { arc: { borderWidth: 0 } },
      },
    });

    return function () {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <traffic-chart>
      <div className={'channels-block' + (transparent ? ' transparent' : '')}>
        <div className="chart-bg"></div>
        <div className="traffic-chart" id="trafficChart">
          <div className="canvas-holder">
            <canvas id="chart-area" width="280" height="280"></canvas>
            <div className="traffic-text">
              1,900,128
              <span>Views Total</span>
            </div>
          </div>
        </div>

        <div className="channels-info">
          <div>
            {labels.map(function (label, i) {
              return (
                <div className="channels-info-item" key={i}>
                  <div className="legend-color" style={{ backgroundColor: backgroundColor[i] }}></div>
                  <p>{label}<span className="channel-number">+{percentage[i]}%</span></p>
                  <div className="progress progress-sm channel-progress">
                    <div className="progress-bar" role="progressbar"
                         aria-valuenow={percentage[i]} aria-valuemin="0" aria-valuemax="100"
                         style={{ width: percentage[i] + '%' }}>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </traffic-chart>
  );
}
