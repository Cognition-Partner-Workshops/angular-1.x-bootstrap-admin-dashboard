/**
 * DashboardPieChart — React port of the AngularJS dashboard-pie-chart directive
 * (DashboardPieChartCtrl + dashboardPieChart.html).
 *
 * Renders four easyPieChart widgets. The jQuery easyPieChart plugin is loaded
 * globally and initialised in a useEffect after mount.
 */
import React, { useRef, useEffect } from 'react';
import { Panel } from '../components/Panel';

export function DashboardPieChart({ baConfig, baUtil }) {
  var containerRef = useRef(null);
  var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

  var charts = [
    { color: pieColor, description: 'New Visits', stats: '57,820', icon: 'person' },
    { color: pieColor, description: 'Purchases', stats: '$ 89,745', icon: 'money' },
    { color: pieColor, description: 'Active Users', stats: '178,391', icon: 'face' },
    { color: pieColor, description: 'Returned', stats: '32,592', icon: 'refresh' },
  ];

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !containerRef.current) {
      return undefined;
    }

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    var $charts = $(containerRef.current).find('.chart');

    var timer = setTimeout(function () {
      $charts.each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $charts.each(function (index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }, 1000);

    return function () {
      clearTimeout(timer);
    };
  }, []);

  return (
    <dashboard-pie-chart>
      <div className="row pie-charts" ref={containerRef}>
        {charts.map(function (chart, i) {
          return (
            <div className="pie-chart-item-container" key={i}>
              <Panel>
                <div className="pie-chart-item">
                  <div className="chart" rel={chart.color} data-percent="60"> <span className="percent"></span> </div>
                  <div className="description">
                    <div>{chart.description}</div>
                    <div className="description-stats">{chart.stats}</div>
                  </div>
                  <i className={'chart-icon i-' + chart.icon}></i>
                </div>
              </Panel>
            </div>
          );
        })}
      </div>
    </dashboard-pie-chart>
  );
}
