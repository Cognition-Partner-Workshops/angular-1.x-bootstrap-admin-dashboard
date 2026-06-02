/**
 * DashboardPieCharts — React migration of the AngularJS `dashboardPieChart`
 * directive + DashboardPieChartCtrl.
 *
 * Renders the row of four easyPieChart widgets at the top of the dashboard.
 * The root element keeps the original `<dashboard-pie-chart>` tag so existing
 * selectors (and the e2e beforeEach) continue to match.
 */
import React, { useEffect, useRef } from 'react';
import { Panel } from '../components/Panel';

export function DashboardPieCharts({ baConfig, baUtil }) {
  var rootRef = useRef(null);

  var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
  var charts = [
    { color: pieColor, description: 'New Visits', stats: '57,820', icon: 'person' },
    { color: pieColor, description: 'Purchases', stats: '$ 89,745', icon: 'money' },
    { color: pieColor, description: 'Active Users', stats: '178,391', icon: 'face' },
    { color: pieColor, description: 'Returned', stats: '32,592', icon: 'refresh' },
  ];

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !rootRef.current) {
      return undefined;
    }
    var $charts = $(rootRef.current).find('.chart');

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

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
      var instance = $(chart).data('easyPieChart');
      if (instance) {
        instance.update(getRandomArbitrary(55, 90));
      }
    });

    return function () {
      $charts.each(function (index, chart) {
        var instance = $(chart).data('easyPieChart');
        if (instance && typeof instance.destroy === 'function') {
          instance.destroy();
        }
      });
    };
  }, []);

  return React.createElement(
    'dashboard-pie-chart',
    { ref: rootRef },
    React.createElement(
      'div',
      { className: 'row pie-charts' },
      charts.map(function (chart, i) {
        return React.createElement(
          'div',
          { className: 'pie-chart-item-container', key: chart.description },
          React.createElement(
            Panel,
            null,
            React.createElement(
              'div',
              { className: 'pie-chart-item' },
              React.createElement(
                'div',
                { className: 'chart', rel: chart.color, 'data-percent': '60' },
                React.createElement('span', { className: 'percent' })
              ),
              React.createElement(
                'div',
                { className: 'description' },
                React.createElement('div', null, chart.description),
                React.createElement('div', { className: 'description-stats' }, chart.stats)
              ),
              React.createElement('i', { className: 'chart-icon i-' + chart.icon })
            )
          )
        );
      })
    )
  );
}
