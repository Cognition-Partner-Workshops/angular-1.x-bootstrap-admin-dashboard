import React, { useEffect, useRef } from 'react';

var dashboardColors = {
  blueStone: '#005562',
  surfieGreen: '#0e8174',
  silverTree: '#6eba8c',
  gossip: '#b9f2a1',
  white: '#10c4b5'
};

function shade(color, weight) {
  function d2h(d) { return d.toString(16); }
  function h2d(h) { return parseInt(h, 16); }
  var result = '#';
  for (var i = 1; i < 7; i += 2) {
    var colorPart = h2d(color.substr(i, 2));
    var blackPart = 0;
    var resultPart = d2h(Math.floor(colorPart + (blackPart - colorPart) * (weight / 100.0)));
    result += ('0' + resultPart).slice(-2);
  }
  return result;
}

var doughnutData = {
  labels: ['Other', 'Search engines', 'Referral Traffic', 'Direct Traffic', 'Ad Campaigns'],
  datasets: [{
    data: [2000, 1500, 1000, 1200, 400],
    backgroundColor: [
      dashboardColors.white,
      dashboardColors.blueStone,
      dashboardColors.surfieGreen,
      dashboardColors.silverTree,
      dashboardColors.gossip
    ],
    hoverBackgroundColor: [
      shade(dashboardColors.white, 15),
      shade(dashboardColors.blueStone, 15),
      shade(dashboardColors.surfieGreen, 15),
      shade(dashboardColors.silverTree, 15),
      shade(dashboardColors.gossip, 15)
    ],
    percentage: [87, 22, 70, 38, 17]
  }]
};

function TrafficChart() {
  var canvasRef = useRef(null);

  useEffect(function () {
    if (canvasRef.current && window.Chart) {
      var ctx = canvasRef.current.getContext('2d');
      new window.Chart(ctx, {
        type: 'doughnut',
        data: doughnutData,
        options: {
          cutoutPercentage: 64,
          responsive: true,
          elements: {
            arc: { borderWidth: 0 }
          }
        }
      });
    }
  }, []);

  var dataset = doughnutData.datasets[0];

  return (
    <div className="channels-block">
      <div className="chart-bg"></div>
      <div className="traffic-chart" id="trafficChart">
        <div className="canvas-holder">
          <canvas ref={canvasRef} id="chart-area" width="280" height="280"></canvas>
          <div className="traffic-text">
            1,900,128
            <span>Views Total</span>
          </div>
        </div>
      </div>
      <div className="channels-info">
        <div>
          {doughnutData.labels.map(function (label, i) {
            return (
              <div key={i} className="channels-info-item">
                <div className="legend-color" style={{ backgroundColor: dataset.backgroundColor[i] }}></div>
                <p>{label}<span className="channel-number">+{dataset.percentage[i]}%</span></p>
                <div className="progress progress-sm channel-progress">
                  <div className="progress-bar" role="progressbar"
                    aria-valuenow={dataset.percentage[i]} aria-valuemin="0" aria-valuemax="100"
                    style={{ width: dataset.percentage[i] + '%' }}>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TrafficChart;
