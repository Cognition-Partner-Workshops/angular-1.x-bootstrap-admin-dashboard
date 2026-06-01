import React, { useEffect, useRef } from 'react';
import Panel from './Panel';

var pieColor = 'rgba(102, 102, 102, 0.2)';

var charts = [
  { color: pieColor, description: 'New Visits', stats: '57,820', icon: 'person' },
  { color: pieColor, description: 'Purchases', stats: '$ 89,745', icon: 'money' },
  { color: pieColor, description: 'Active Users', stats: '178,391', icon: 'face' },
  { color: pieColor, description: 'Returned', stats: '32,592', icon: 'refresh' }
];

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function PieChartItem({ chart, index }) {
  var chartRef = useRef(null);

  useEffect(function () {
    var timer = setTimeout(function () {
      if (chartRef.current && window.$ && window.$.fn.easyPieChart) {
        var $chart = window.$(chartRef.current);
        $chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            window.$(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.color,
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round'
        });
        $chart.data('easyPieChart').update(getRandomArbitrary(55, 90));
      }
    }, 1000);
    return function () { clearTimeout(timer); };
  }, []);

  return (
    <div className="pie-chart-item-container">
      <Panel>
        <div className="pie-chart-item">
          <div className="chart" ref={chartRef} rel={chart.color} data-percent="60">
            <span className="percent"></span>
          </div>
          <div className="description">
            <div>{chart.description}</div>
            <div className="description-stats">{chart.stats}</div>
          </div>
          <i className={'chart-icon i-' + chart.icon}></i>
        </div>
      </Panel>
    </div>
  );
}

function DashboardPieChart() {
  return (
    <div className="row pie-charts">
      {charts.map(function (chart, index) {
        return <PieChartItem key={index} chart={chart} index={index} />;
      })}
    </div>
  );
}

export default DashboardPieChart;
