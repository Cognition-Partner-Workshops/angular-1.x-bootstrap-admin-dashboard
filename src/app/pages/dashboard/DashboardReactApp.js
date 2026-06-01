(function () {
  'use strict';

  var h = React.createElement;

  // --- Color helpers (replicate from theme.constants.js) ---
  function mix(color1, color2, weight) {
    function d2h(d) { return d.toString(16); }
    function h2d(hex) { return parseInt(hex, 16); }
    var result = '#';
    for (var i = 1; i < 7; i += 2) {
      var c1 = h2d(color1.substr(i, 2));
      var c2 = h2d(color2.substr(i, 2));
      var rp = d2h(Math.floor(c2 + (c1 - c2) * (weight / 100.0)));
      result += ('0' + rp).slice(-2);
    }
    return result;
  }
  function tint(color, weight) { return mix('#ffffff', color, weight); }
  function shade(color, weight) { return mix('#000000', color, weight); }
  function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  // --- Theme colors ---
  var colorScheme = {
    primary: '#209e91',
    info: '#2dacd1',
    success: '#90b900',
    warning: '#dfb81c',
    danger: '#e85656'
  };

  var basic = {
    default: '#ffffff',
    defaultText: '#666666',
    border: '#dddddd',
    borderDark: '#aaaaaa'
  };

  var layoutColors = {
    default: basic.default,
    defaultText: basic.defaultText,
    border: basic.border,
    borderDark: basic.borderDark,
    primary: colorScheme.primary,
    info: colorScheme.info,
    success: colorScheme.success,
    warning: colorScheme.warning,
    danger: colorScheme.danger,
    primaryLight: tint(colorScheme.primary, 30),
    infoLight: tint(colorScheme.info, 30),
    successLight: tint(colorScheme.success, 30),
    warningLight: tint(colorScheme.warning, 30),
    dangerLight: tint(colorScheme.danger, 30),
    primaryDark: shade(colorScheme.primary, 15),
    infoDark: shade(colorScheme.info, 15),
    successDark: shade(colorScheme.success, 15),
    warningDark: shade(colorScheme.warning, 15),
    dangerDark: shade(colorScheme.danger, 15),
    dashboard: {
      blueStone: '#005562',
      surfieGreen: '#0e8174',
      silverTree: '#6eba8c',
      gossip: '#b9f2a1',
      white: '#10c4b5'
    }
  };

  var dashboardColors = layoutColors.dashboard;

  // --- Feed data ---
  var feedData = [
    { type: 'text-message', author: 'Kostya', surname: 'Danovsky', header: 'Posted new message', text: 'Guys, check this out: \nA police officer found a perfect hiding place for watching for speeding motorists. One day, the officer was amazed when everyone was under the speed limit, so he investigated and found the problem. A 10 years old boy was standing on the side of the road with a huge hand painted sign which said "Radar Trap Ahead." A little more investigative work led the officer to the boy\'s accomplice: another boy about 100 yards beyond the radar trap with a sign reading "TIPS" and a bucket at his feet full of change.', time: 'Today 11:55 pm', ago: '25 minutes ago' },
    { type: 'video-message', author: 'Andrey', surname: 'Hrabouski', header: 'Added new video', text: '"Vader and Me"', preview: 'app/feed/vader-and-me-preview.png', link: 'https://www.youtube.com/watch?v=IfcpzBbbamk', time: 'Today 9:30 pm', ago: '3 hrs ago' },
    { type: 'image-message', author: 'Vlad', surname: 'Lugovsky', header: 'Added new image', text: '"My little kitten"', preview: 'app/feed/my-little-kitten.png', link: 'http://api.ning.com/files/DtcI2O2Ry7A7VhVxeiWfGU9WkHcMy4WSTWZ79oxJq*h0iXvVGndfD7CIYy-Ax-UAFCBCdqXI4GCBw3FOLKTTjQc*2cmpdOXJ/1082127884.jpeg', time: 'Today 2:20 pm', ago: '10 hrs ago' },
    { type: 'text-message', author: 'Nasta', surname: 'Linnie', header: 'Posted new message', text: 'Haha lol', time: '11.11.2015', ago: '2 days ago' },
    { type: 'geo-message', author: 'Nick', surname: 'Cat', header: 'Posted location', text: '"New York, USA"', preview: 'app/feed/new-york-location.png', link: 'https://www.google.by/maps/place/New+York,+NY,+USA/@40.7201111,-73.9893872,14z', time: '11.11.2015', ago: '2 days ago' },
    { type: 'text-message', author: 'Vlad', surname: 'Lugovsky', header: 'Posted new message', text: "First snake: I hope I'm not poisonous. Second snake: Why? First snake: Because I bit my lip!", time: '12.11.2015', ago: '3 days ago' },
    { type: 'text-message', author: 'Andrey', surname: 'Hrabouski', header: 'Posted new message', text: 'How do you smuggle an elephant across the border? Put a slice of bread on each side, and call him "lunch".', time: '14.11.2015', ago: '5 days ago' },
    { type: 'text-message', author: 'Nasta', surname: 'Linnie', header: 'Posted new message', text: 'When your hammer is C++, everything begins to look like a thumb.', time: '14.11.2015', ago: '5 days ago' },
    { type: 'text-message', author: 'Alexander', surname: 'Demeshko', header: 'Posted new message', text: '"I mean, they say you die twice. One time when you stop breathing and a second time, a bit later on, when somebody says your name for the last time." \u00a9', time: '15.11.2015', ago: '6 days ago' },
    { type: 'image-message', author: 'Nick', surname: 'Cat', header: 'Posted photo', text: '"Protein Heroes"', preview: 'app/feed/genom.png', link: 'https://dribbble.com/shots/2504810-Protein-Heroes', time: '16.11.2015', ago: '7 days ago' },
    { type: 'text-message', author: 'Kostya', surname: 'Danovsky', header: 'Posted new message', text: "Why did the CoffeeScript developer keep getting lost? Because he couldn't find his source without a map", time: '18.11.2015', ago: '9 days ago' }
  ];

  // --- Todo data ---
  var initialTodos = [
    { text: 'Check me out' },
    { text: 'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro' },
    { text: 'Ex has semper alterum, expetenda dignissim' },
    { text: 'Vim an eius ocurreret abhorreant, id nam aeque persius ornatus.' },
    { text: 'Simul erroribus ad usu' },
    { text: 'Ei cum solet appareat, ex est graeci mediocritatem' },
    { text: 'Get in touch with akveo team' },
    { text: 'Write email to business cat' },
    { text: 'Have fun with blur admin' },
    { text: 'What do you think?' }
  ];

  // --- Pie chart data ---
  var pieChartData = [
    { description: 'New Visits', stats: '57,820', icon: 'person' },
    { description: 'Purchases', stats: '$ 89,745', icon: 'money' },
    { description: 'Active Users', stats: '178,391', icon: 'face' },
    { description: 'Returned', stats: '32,592', icon: 'refresh' }
  ];

  var pieColor = hexToRGB(basic.defaultText, 0.2);

  // --- Traffic chart data ---
  var trafficLabels = ['Other', 'Search engines', 'Referral Traffic', 'Direct Traffic', 'Ad Campaigns'];
  var trafficData = [2000, 1500, 1000, 1200, 400];
  var trafficBgColors = [
    dashboardColors.white,
    dashboardColors.blueStone,
    dashboardColors.surfieGreen,
    dashboardColors.silverTree,
    dashboardColors.gossip
  ];
  var trafficPercentages = [87, 22, 70, 38, 17];

  // --- Helper: getRandomColor from dashboard colors ---
  function getRandomColor() {
    var keys = Object.keys(dashboardColors);
    var i = Math.floor(Math.random() * keys.length);
    return dashboardColors[keys[i]];
  }

  // --- PieChartItem component ---
  function PieChartItem(props) {
    var chart = props.chart;
    var percentRef = React.useRef(null);
    var chartRef = React.useRef(null);

    React.useEffect(function () {
      if (chartRef.current && typeof $ !== 'undefined' && $.fn.easyPieChart) {
        var $chart = $(chartRef.current);
        $chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: $chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round'
        });
        var randomVal = Math.random() * (90 - 55) + 55;
        $chart.data('easyPieChart').update(randomVal);
      }
    }, []);

    return h('div', { className: 'pie-chart-item-container' },
      h('div', { className: 'panel panel-blur with-scroll animated zoomIn' },
        h('div', { className: 'panel-body' },
          h('div', { className: 'pie-chart-item' },
            h('div', { className: 'chart', ref: chartRef, rel: chart.color, 'data-percent': '60' },
              h('span', { className: 'percent', ref: percentRef })
            ),
            h('div', { className: 'description' },
              h('div', null, chart.description),
              h('div', { className: 'description-stats' }, chart.stats)
            ),
            h('i', { className: 'chart-icon i-' + chart.icon })
          )
        )
      )
    );
  }

  // --- DashboardPieChart component ---
  function DashboardPieChart() {
    var charts = pieChartData.map(function (c) {
      return { color: pieColor, description: c.description, stats: c.stats, icon: c.icon };
    });

    return h('div', { className: 'row pie-charts' },
      charts.map(function (chart, i) {
        return h(PieChartItem, { key: i, chart: chart });
      })
    );
  }

  // --- TrafficChart component ---
  function TrafficChart() {
    var canvasRef = React.useRef(null);

    React.useEffect(function () {
      if (canvasRef.current && typeof Chart !== 'undefined') {
        var ctx = canvasRef.current.getContext('2d');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: trafficLabels,
            datasets: [{
              data: trafficData,
              backgroundColor: trafficBgColors,
              hoverBackgroundColor: trafficBgColors.map(function (c) { return shade(c, 15); }),
              percentage: trafficPercentages
            }]
          },
          options: {
            cutoutPercentage: 64,
            responsive: true,
            elements: { arc: { borderWidth: 0 } }
          }
        });
      }
    }, []);

    return h('div', { className: 'channels-block' },
      h('div', { className: 'chart-bg' }),
      h('div', { className: 'traffic-chart', id: 'trafficChart' },
        h('div', { className: 'canvas-holder' },
          h('canvas', { id: 'chart-area', ref: canvasRef, width: 280, height: 280 }),
          h('div', { className: 'traffic-text' },
            '1,900,128',
            h('span', null, 'Views Total')
          )
        )
      ),
      h('div', { className: 'channels-info' },
        h('div', null,
          trafficLabels.map(function (label, i) {
            return h('div', { key: i, className: 'channels-info-item' },
              h('div', { className: 'legend-color', style: { backgroundColor: trafficBgColors[i] } }),
              h('p', null,
                label,
                h('span', { className: 'channel-number' }, '+' + trafficPercentages[i] + '%')
              ),
              h('div', { className: 'progress progress-sm channel-progress' },
                h('div', {
                  className: 'progress-bar',
                  role: 'progressbar',
                  'aria-valuenow': String(trafficPercentages[i]),
                  'aria-valuemin': '0',
                  'aria-valuemax': '100',
                  style: { width: trafficPercentages[i] + '%' }
                })
              )
            );
          })
        )
      )
    );
  }

  // --- DashboardMap component ---
  function DashboardMap() {
    React.useEffect(function () {
      if (typeof AmCharts !== 'undefined') {
        AmCharts.makeChart('amChartMap', {
          type: 'map',
          theme: 'blur',
          zoomControl: { zoomControlEnabled: false, panControlEnabled: false },
          dataProvider: {
            map: 'worldLow',
            zoomLevel: 3.5,
            zoomLongitude: 10,
            zoomLatitude: 52,
            areas: [
              { title: 'Austria', id: 'AT', color: layoutColors.primary, customData: '1 244', groupId: '1' },
              { title: 'Ireland', id: 'IE', color: layoutColors.primary, customData: '1 342', groupId: '1' },
              { title: 'Denmark', id: 'DK', color: layoutColors.primary, customData: '1 973', groupId: '1' },
              { title: 'Finland', id: 'FI', color: layoutColors.primary, customData: '1 573', groupId: '1' },
              { title: 'Sweden', id: 'SE', color: layoutColors.primary, customData: '1 084', groupId: '1' },
              { title: 'Great Britain', id: 'GB', color: layoutColors.primary, customData: '1 452', groupId: '1' },
              { title: 'Italy', id: 'IT', color: layoutColors.primary, customData: '1 321', groupId: '1' },
              { title: 'France', id: 'FR', color: layoutColors.primary, customData: '1 112', groupId: '1' },
              { title: 'Spain', id: 'ES', color: layoutColors.primary, customData: '1 865', groupId: '1' },
              { title: 'Greece', id: 'GR', color: layoutColors.primary, customData: '1 453', groupId: '1' },
              { title: 'Germany', id: 'DE', color: layoutColors.primary, customData: '1 957', groupId: '1' },
              { title: 'Belgium', id: 'BE', color: layoutColors.primary, customData: '1 011', groupId: '1' },
              { title: 'Luxembourg', id: 'LU', color: layoutColors.primary, customData: '1 011', groupId: '1' },
              { title: 'Netherlands', id: 'NL', color: layoutColors.primary, customData: '1 213', groupId: '1' },
              { title: 'Portugal', id: 'PT', color: layoutColors.primary, customData: '1 291', groupId: '1' },
              { title: 'Lithuania', id: 'LT', color: layoutColors.successLight, customData: '567', groupId: '2' },
              { title: 'Latvia', id: 'LV', color: layoutColors.successLight, customData: '589', groupId: '2' },
              { title: 'Czech Republic ', id: 'CZ', color: layoutColors.successLight, customData: '785', groupId: '2' },
              { title: 'Slovakia', id: 'SK', color: layoutColors.successLight, customData: '965', groupId: '2' },
              { title: 'Estonia', id: 'EE', color: layoutColors.successLight, customData: '685', groupId: '2' },
              { title: 'Hungary', id: 'HU', color: layoutColors.successLight, customData: '854', groupId: '2' },
              { title: 'Cyprus', id: 'CY', color: layoutColors.successLight, customData: '754', groupId: '2' },
              { title: 'Malta', id: 'MT', color: layoutColors.successLight, customData: '867', groupId: '2' },
              { title: 'Poland', id: 'PL', color: layoutColors.successLight, customData: '759', groupId: '2' },
              { title: 'Romania', id: 'RO', color: layoutColors.success, customData: '302', groupId: '3' },
              { title: 'Bulgaria', id: 'BG', color: layoutColors.success, customData: '102', groupId: '3' },
              { title: 'Slovenia', id: 'SI', color: layoutColors.danger, customData: '23', groupId: '4' },
              { title: 'Croatia', id: 'HR', color: layoutColors.danger, customData: '96', groupId: '4' }
            ]
          },
          areasSettings: {
            rollOverOutlineColor: layoutColors.border,
            rollOverColor: layoutColors.primaryDark,
            alpha: 0.8,
            unlistedAreasAlpha: 0.2,
            unlistedAreasColor: layoutColors.defaultText,
            balloonText: '[[title]]: [[customData]] users'
          },
          legend: {
            width: '100%',
            marginRight: 27,
            marginLeft: 27,
            equalWidths: false,
            backgroundAlpha: 0.3,
            backgroundColor: layoutColors.border,
            borderColor: layoutColors.border,
            borderAlpha: 1,
            top: 362,
            left: 0,
            horizontalGap: 10,
            data: [
              { title: 'over 1 000 users', color: layoutColors.primary },
              { title: '500 - 1 000 users', color: layoutColors.successLight },
              { title: '100 - 500 users', color: layoutColors.success },
              { title: '0 - 100 users', color: layoutColors.danger }
            ]
          },
          export: { enabled: true },
          creditsPosition: 'bottom-right',
          pathToImages: 'assets/img/theme/vendor/ammap//dist/ammap/images/'
        });
      }
    }, []);

    return h('div', { id: 'amChartMap' });
  }

  // --- DashboardLineChart component ---
  function DashboardLineChart() {
    React.useEffect(function () {
      if (typeof AmCharts !== 'undefined') {
        var graphColor = layoutColors.primary;
        var chartData = [
          { date: new Date(2012, 11), value: 0, value0: 0 },
          { date: new Date(2013, 0), value: 15000, value0: 19000 },
          { date: new Date(2013, 1), value: 30000, value0: 20000 },
          { date: new Date(2013, 2), value: 25000, value0: 22000 },
          { date: new Date(2013, 3), value: 21000, value0: 25000 },
          { date: new Date(2013, 4), value: 24000, value0: 29000 },
          { date: new Date(2013, 5), value: 31000, value0: 26000 },
          { date: new Date(2013, 6), value: 40000, value0: 25000 },
          { date: new Date(2013, 7), value: 37000, value0: 20000 },
          { date: new Date(2013, 8), value: 18000, value0: 22000 },
          { date: new Date(2013, 9), value: 5000, value0: 26000 },
          { date: new Date(2013, 10), value: 40000, value0: 30000 },
          { date: new Date(2013, 11), value: 20000, value0: 25000 },
          { date: new Date(2014, 0), value: 5000, value0: 13000 },
          { date: new Date(2014, 1), value: 3000, value0: 13000 },
          { date: new Date(2014, 2), value: 1800, value0: 13000 },
          { date: new Date(2014, 3), value: 10400, value0: 13000 },
          { date: new Date(2014, 4), value: 25500, value0: 13000 },
          { date: new Date(2014, 5), value: 2100, value0: 13000 },
          { date: new Date(2014, 6), value: 6500, value0: 13000 },
          { date: new Date(2014, 7), value: 1100, value0: 13000 },
          { date: new Date(2014, 8), value: 17200, value0: 13000 },
          { date: new Date(2014, 9), value: 26900, value0: 13000 },
          { date: new Date(2014, 10), value: 14100, value0: 13000 },
          { date: new Date(2014, 11), value: 35300, value0: 13000 },
          { date: new Date(2015, 0), value: 54800, value0: 13000 },
          { date: new Date(2015, 1), value: 49800, value0: 13000 }
        ];

        var chart = AmCharts.makeChart('amchart', {
          type: 'serial',
          theme: 'blur',
          marginTop: 15,
          marginRight: 15,
          dataProvider: chartData,
          categoryField: 'date',
          categoryAxis: {
            parseDates: true,
            gridAlpha: 0,
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText
          },
          valueAxes: [{
            minVerticalGap: 50,
            gridAlpha: 0,
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText
          }],
          graphs: [
            {
              id: 'g0',
              bullet: 'none',
              useLineColorForBulletBorder: true,
              lineColor: hexToRGB(graphColor, 0.3),
              lineThickness: 1,
              negativeLineColor: layoutColors.danger,
              type: 'smoothedLine',
              valueField: 'value0',
              fillAlphas: 1,
              fillColorsField: 'lineColor'
            },
            {
              id: 'g1',
              bullet: 'none',
              useLineColorForBulletBorder: true,
              lineColor: hexToRGB(graphColor, 0.5),
              lineThickness: 1,
              negativeLineColor: layoutColors.danger,
              type: 'smoothedLine',
              valueField: 'value',
              fillAlphas: 1,
              fillColorsField: 'lineColor'
            }
          ],
          chartCursor: {
            categoryBalloonDateFormat: 'MM YYYY',
            categoryBalloonColor: '#4285F4',
            categoryBalloonAlpha: 0.7,
            cursorAlpha: 0,
            valueLineEnabled: true,
            valueLineBalloonEnabled: true,
            valueLineAlpha: 0.5
          },
          dataDateFormat: 'MM YYYY',
          export: { enabled: true },
          creditsPosition: 'bottom-right',
          zoomOutButton: { backgroundColor: '#fff', backgroundAlpha: 0 },
          zoomOutText: '',
          pathToImages: 'assets/img/theme/vendor/amcharts/dist/amcharts/images/'
        });

        function zoomChart() {
          chart.zoomToDates(new Date(2013, 3), new Date(2014, 0));
        }
        chart.addListener('rendered', zoomChart);
        zoomChart();
        if (chart.zoomChart) {
          chart.zoomChart();
        }
      }
    }, []);

    return h('div', { id: 'amchart' });
  }

  // --- PopularApp component ---
  function PopularApp() {
    return h('div', null,
      h('div', { className: 'popular-app-img-container' },
        h('div', { className: 'popular-app-img' },
          h('img', { src: 'assets/img/app/my-app-logo.png' }),
          h('span', { className: 'logo-text' }, 'Super\u00a0App')
        )
      ),
      h('div', { className: 'popular-app-cost row' },
        h('div', { className: 'col-xs-9' }, 'Most Popular App'),
        h('div', { className: 'col-xs-3 text-right' }, '175$')
      ),
      h('div', { className: 'popular-app-info row' },
        h('div', { className: 'col-xs-4 text-left' },
          h('div', { className: 'info-label' }, 'Total Visits'),
          h('div', null, '47,512')
        ),
        h('div', { className: 'col-xs-4 text-center' },
          h('div', { className: 'info-label' }, 'New Visits'),
          h('div', null, '9,217')
        ),
        h('div', { className: 'col-xs-4 text-right' },
          h('div', { className: 'info-label' }, 'Sales'),
          h('div', null, '2,928')
        )
      )
    );
  }

  // --- BlurFeed component ---
  function BlurFeed() {
    var expandedState = React.useState({});
    var expanded = expandedState[0];
    var setExpanded = expandedState[1];

    function toggleExpand(index) {
      setExpanded(function (prev) {
        var next = {};
        for (var k in prev) { next[k] = prev[k]; }
        next[index] = !prev[index];
        return next;
      });
    }

    return h('div', { className: 'feed-messages-container' },
      feedData.map(function (message, i) {
        var isExpanded = !!expanded[i];
        return h('div', {
          key: i,
          className: 'feed-message',
          onClick: function () { toggleExpand(i); }
        },
          message.type === 'text-message'
            ? h('div', { className: 'message-icon' },
                h('img', { className: 'photo-icon', src: 'assets/img/app/profile/' + message.author + '.png' })
              )
            : h('div', { className: 'message-icon' },
                h('img', { className: 'photo-icon', src: 'assets/img/app/profile/' + message.author + '.png' }),
                h('span', { className: 'sub-photo-icon ' + message.type })
              ),
          h('div', { className: 'text-block text-message' },
            h('div', { className: 'message-header' },
              h('span', { className: 'author' }, message.author + ' ' + message.surname)
            ),
            h('div', { className: 'message-content line-clamp' + (isExpanded ? '' : ' line-clamp-2') },
              message.preview ? h('span', null, message.header + ' ') : null,
              message.text
            ),
            message.preview && isExpanded
              ? h('div', { className: 'preview' },
                  h('a', { href: message.link, target: '_blank' },
                    h('img', { src: 'assets/img/' + message.preview })
                  )
                )
              : null,
            isExpanded
              ? h('div', { className: 'message-time' },
                  h('div', { className: 'post-time' }, message.time),
                  h('div', { className: 'ago-time' }, message.ago)
                )
              : null
          )
        );
      })
    );
  }

  // --- DashboardTodo component ---
  var nextTodoId = { current: 0 };
  function DashboardTodo() {
    var todoState = React.useState(function () {
      return initialTodos.map(function (item) {
        return { id: nextTodoId.current++, text: item.text, color: getRandomColor(), deleted: false };
      });
    });
    var todoList = todoState[0];
    var setTodoList = todoState[1];

    var newTextState = React.useState('');
    var newTodoText = newTextState[0];
    var setNewTodoText = newTextState[1];

    function addTodoItem(event, clickPlus) {
      if (clickPlus || (event && event.which === 13)) {
        setTodoList(function (prev) {
          return [{ id: nextTodoId.current++, text: newTodoText, color: getRandomColor(), deleted: false }].concat(prev);
        });
        setNewTodoText('');
      }
    }

    return h('div', { className: 'task-todo-container' },
      h('input', {
        type: 'text',
        className: 'form-control task-todo',
        placeholder: 'Task to do..',
        value: newTodoText,
        onChange: function (e) { setNewTodoText(e.target.value); },
        onKeyUp: function (e) { addTodoItem(e); }
      }),
      h('i', {
        className: 'add-item-icon ion-plus-round',
        onClick: function () { addTodoItem(null, true); }
      }),
      h('div', { className: 'box-shadow-border' }),
      h('ul', { className: 'todo-list' },
        todoList.map(function (item, i) {
          if (item.deleted) return null;
          return h(TodoItem, {
            key: item.id,
            item: item,
            onDelete: function () {
              setTodoList(function (prev) {
                return prev.map(function (it, idx) {
                  if (idx === i) return { id: it.id, text: it.text, color: it.color, deleted: true };
                  return it;
                });
              });
            }
          });
        })
      )
    );
  }

  function TodoItem(props) {
    var item = props.item;
    var onDelete = props.onDelete;
    var checkedState = React.useState(false);
    var isChecked = checkedState[0];
    var setIsChecked = checkedState[1];
    var activeState = React.useState(false);
    var activeItem = activeState[0];
    var setActiveItem = activeState[1];

    return h('li', {
      className: (isChecked ? 'checked ' : '') + (activeItem ? 'active' : ''),
      onMouseEnter: function () { setActiveItem(true); },
      onMouseLeave: function () { setActiveItem(false); }
    },
      h('div', { className: 'blur-container' },
        h('div', { className: 'blur-box' })
      ),
      h('i', { className: 'mark', style: { backgroundColor: item.color } }),
      h('label', { className: 'todo-checkbox custom-checkbox custom-input-success' },
        h('input', {
          type: 'checkbox',
          checked: isChecked,
          onChange: function () { setIsChecked(!isChecked); }
        }),
        h('span', { className: 'cut-with-dots' }, item.text)
      ),
      h('i', {
        className: 'remove-todo ion-ios-close-empty',
        onClick: function (e) {
          e.stopPropagation();
          onDelete();
        }
      })
    );
  }

  // --- DashboardCalendar component ---
  function DashboardCalendar() {
    React.useEffect(function () {
      if (typeof $ !== 'undefined' && $.fn.fullCalendar) {
        var $element = $('#calendar').fullCalendar({
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          defaultDate: '2016-03-08',
          selectable: true,
          selectHelper: true,
          select: function (start, end) {
            var title = prompt('Event Title:');
            var eventData;
            if (title) {
              eventData = { title: title, start: start, end: end };
              $element.fullCalendar('renderEvent', eventData, true);
            }
            $element.fullCalendar('unselect');
          },
          editable: true,
          eventLimit: true,
          events: [
            { title: 'All Day Event', start: '2016-03-01', color: dashboardColors.silverTree },
            { title: 'Long Event', start: '2016-03-07', end: '2016-03-10', color: dashboardColors.blueStone },
            { title: 'Dinner', start: '2016-03-14T20:00:00', color: dashboardColors.surfieGreen },
            { title: 'Birthday Party', start: '2016-04-01T07:00:00', color: dashboardColors.gossip }
          ]
        });
      }
    }, []);

    return h('div', { id: 'calendar', className: 'blurCalendar' });
  }

  // --- Main Dashboard App ---
  function DashboardApp() {
    return h('div', null,
      h(DashboardPieChart),
      h('div', { className: 'row' },
        h('div', {
          className: 'col-lg-6 col-md-12 col-sm-12',
          'ba-panel': '',
          'ba-panel-title': 'Acquisition Channels',
          'ba-panel-class': 'medium-panel traffic-panel'
        },
          h('div', { className: 'panel panel-blur with-scroll animated zoomIn medium-panel traffic-panel' },
            h('div', { className: 'panel-heading clearfix' },
              h('h3', { className: 'panel-title' }, 'Acquisition Channels')
            ),
            h('div', { className: 'panel-body' },
              h(TrafficChart)
            )
          )
        ),
        h('div', {
          className: 'col-lg-6 col-md-12 col-sm-12'
        },
          h('div', { className: 'panel panel-blur with-scroll animated zoomIn medium-panel' },
            h('div', { className: 'panel-heading clearfix' },
              h('h3', { className: 'panel-title' }, 'Users by Country')
            ),
            h('div', { className: 'panel-body' },
              h(DashboardMap)
            )
          )
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-xlg-9 col-lg-6 col-md-6 col-sm-12 col-xs-12' },
          h('div', { className: 'row' },
            h('div', { className: 'col-xlg-8 col-lg-12 col-md-12 col-sm-7 col-xs-12' },
              h('div', { className: 'panel panel-blur with-scroll animated zoomIn medium-panel' },
                h('div', { className: 'panel-heading clearfix' },
                  h('h3', { className: 'panel-title' }, 'Revenue')
                ),
                h('div', { className: 'panel-body' },
                  h(DashboardLineChart)
                )
              )
            ),
            h('div', { className: 'col-xlg-4 col-lg-12 col-md-12 col-sm-5 col-xs-12' },
              h('div', { className: 'panel panel-blur with-scroll animated zoomIn popular-app medium-panel' },
                h('div', { className: 'panel-body' },
                  h(PopularApp)
                )
              )
            )
          )
        ),
        h('div', { className: 'col-xlg-3 col-lg-6 col-md-6 col-sm-12 col-xs-12' },
          h('div', { className: 'panel panel-blur with-scroll animated zoomIn large-panel with-scroll feed-panel' },
            h('div', { className: 'panel-heading clearfix' },
              h('h3', { className: 'panel-title' }, 'Feed')
            ),
            h('div', { className: 'panel-body' },
              h(BlurFeed)
            )
          )
        )
      ),
      h('div', { className: 'row shift-up' },
        h('div', { className: 'col-xlg-3 col-lg-6 col-md-6 col-xs-12' },
          h('div', { className: 'panel panel-blur with-scroll animated zoomIn xmedium-panel feed-comply-panel with-scroll todo-panel' },
            h('div', { className: 'panel-heading clearfix' },
              h('h3', { className: 'panel-title' }, 'To Do List')
            ),
            h('div', { className: 'panel-body' },
              h(DashboardTodo)
            )
          )
        ),
        h('div', { className: 'col-xlg-6 col-lg-6 col-md-6 col-xs-12' },
          h('div', { className: 'panel panel-blur with-scroll animated zoomIn xmedium-panel feed-comply-panel with-scroll calendar-panel' },
            h('div', { className: 'panel-heading clearfix' },
              h('h3', { className: 'panel-title' }, 'Calendar')
            ),
            h('div', { className: 'panel-body' },
              h(DashboardCalendar)
            )
          )
        )
      )
    );
  }

  // --- Mount/Unmount API ---
  var mountEl = null;
  window.mountDashboardReact = function (element) {
    mountEl = element;
    ReactDOM.render(h(DashboardApp), element);
  };
  window.unmountDashboardReact = function () {
    if (mountEl) {
      ReactDOM.unmountComponentAtNode(mountEl);
      mountEl = null;
    }
  };
})();
