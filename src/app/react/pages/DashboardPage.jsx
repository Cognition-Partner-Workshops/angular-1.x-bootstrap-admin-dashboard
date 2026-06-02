import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Panel } from '../components/Panel';
import { profilePicture } from '../utils/profilePicture';
import { colorHelper } from '../utils/colorHelper';

var h = React.createElement;

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
}

function appImage(path) {
  return 'assets/img/' + path;
}

// ======================== DashboardPieCharts ========================

function DashboardPieCharts({ baConfig }) {
  var pieColor = hexToRGB(baConfig.colors.defaultText, 0.2);
  var charts = [
    { color: pieColor, description: 'New Visits', stats: '57,820', icon: 'person' },
    { color: pieColor, description: 'Purchases', stats: '$ 89,745', icon: 'money' },
    { color: pieColor, description: 'Active Users', stats: '178,391', icon: 'face' },
    { color: pieColor, description: 'Returned', stats: '32,592', icon: 'refresh' },
  ];

  var containerRef = useRef(null);

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !containerRef.current) return;

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    var timer = setTimeout(function () {
      $(containerRef.current).find('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('data-color'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $(containerRef.current).find('.chart').each(function (index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }, 1000);

    return function () { clearTimeout(timer); };
  }, []);

  return h('dashboard-pie-chart', null,
    h('div', { ref: containerRef, className: 'row pie-charts' },
      charts.map(function (chart, i) {
        return h('div', { className: 'pie-chart-item-container', key: i },
          h(Panel, null,
            h('div', { className: 'pie-chart-item' },
              h('div', { className: 'chart', 'data-color': chart.color, 'data-percent': '60' },
                h('span', { className: 'percent' })
              ),
              h('div', { className: 'description' },
                h('div', null, chart.description),
                h('div', { className: 'description-stats' }, chart.stats)
              ),
              h('i', { className: 'chart-icon i-' + chart.icon })
            )
          )
        );
      })
    )
  );
}

// ======================== TrafficChart ========================

function TrafficChart({ baConfig }) {
  var dashboardColors = baConfig.colors.dashboard;
  var transparent = baConfig.theme.blur;
  var canvasRef = useRef(null);

  var doughnutData = useRef({
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
        colorHelper.shade(dashboardColors.white, 15),
        colorHelper.shade(dashboardColors.blueStone, 15),
        colorHelper.shade(dashboardColors.surfieGreen, 15),
        colorHelper.shade(dashboardColors.silverTree, 15),
        colorHelper.shade(dashboardColors.gossip, 15)
      ],
      percentage: [87, 22, 70, 38, 17]
    }]
  }).current;

  useEffect(function () {
    if (!canvasRef.current || !window.Chart) return;
    var ctx = canvasRef.current.getContext('2d');
    window.myDoughnut = new window.Chart(ctx, {
      type: 'doughnut',
      data: doughnutData,
      options: {
        cutoutPercentage: 64,
        responsive: true,
        elements: { arc: { borderWidth: 0 } }
      }
    });
  }, []);

  var dataset = doughnutData.datasets[0];

  return h('div', { className: 'channels-block' + (transparent ? ' transparent' : '') },
    h('div', { className: 'chart-bg' }),
    h('div', { className: 'traffic-chart', id: 'trafficChart' },
      h('div', { className: 'canvas-holder' },
        h('canvas', { id: 'chart-area', width: '280', height: '280', ref: canvasRef }),
        h('div', { className: 'traffic-text' },
          '1,900,128',
          h('span', null, 'Views Total')
        )
      )
    ),
    h('div', { className: 'channels-info' },
      h('div', null,
        doughnutData.labels.map(function (label, i) {
          return h('div', { className: 'channels-info-item', key: i },
            h('div', { className: 'legend-color', style: { backgroundColor: dataset.backgroundColor[i] } }),
            h('p', null,
              label,
              h('span', { className: 'channel-number' }, '+' + dataset.percentage[i] + '%')
            ),
            h('div', { className: 'progress progress-sm channel-progress' },
              h('div', {
                className: 'progress-bar',
                role: 'progressbar',
                'aria-valuenow': String(dataset.percentage[i]),
                'aria-valuemin': '0',
                'aria-valuemax': '100',
                style: { width: dataset.percentage[i] + '%' }
              })
            )
          );
        })
      )
    )
  );
}

// ======================== DashboardMap ========================

function DashboardMap({ baConfig, layoutPaths }) {
  var layoutColors = baConfig.colors;

  useEffect(function () {
    var AmCharts = window.AmCharts;
    if (!AmCharts) return;

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
      'export': { enabled: true },
      creditsPosition: 'bottom-right',
      pathToImages: layoutPaths.images.amChart
    });
  }, []);

  return h('div', { id: 'amChartMap' });
}

// ======================== DashboardLineChart ========================

function DashboardLineChart({ baConfig, layoutPaths }) {
  var layoutColors = baConfig.colors;
  var graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;

  useEffect(function () {
    var AmCharts = window.AmCharts;
    if (!AmCharts) return;

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
      'export': { enabled: true },
      creditsPosition: 'bottom-right',
      zoomOutButton: {
        backgroundColor: '#fff',
        backgroundAlpha: 0
      },
      zoomOutText: '',
      pathToImages: layoutPaths.images.amChart
    });

    function zoomChart() {
      chart.zoomToDates(new Date(2013, 3), new Date(2014, 0));
    }

    chart.addListener('rendered', zoomChart);
    zoomChart();
    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }, []);

  return h('div', { id: 'amchart' });
}

// ======================== PopularApp ========================

function PopularApp() {
  return h('popular-app', null,
    h('div', { className: 'popular-app-img-container' },
      h('div', { className: 'popular-app-img' },
        h('img', { src: appImage('app/my-app-logo.png') }),
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

// ======================== BlurFeed ========================

var FEED_DATA = [
  {
    type: 'text-message', author: 'Kostya', surname: 'Danovsky',
    header: 'Posted new message',
    text: 'Guys, check this out: \nA police officer found a perfect hiding place for watching for speeding motorists. One day, the officer was amazed when everyone was under the speed limit, so he investigated and found the problem. A 10 years old boy was standing on the side of the road with a huge hand painted sign which said "Radar Trap Ahead." A little more investigative work led the officer to the boy\'s accomplice: another boy about 100 yards beyond the radar trap with a sign reading "TIPS" and a bucket at his feet full of change.',
    time: 'Today 11:55 pm', ago: '25 minutes ago', expanded: false,
  },
  {
    type: 'video-message', author: 'Andrey', surname: 'Hrabouski',
    header: 'Added new video', text: '"Vader and Me"',
    preview: 'app/feed/vader-and-me-preview.png',
    link: 'https://www.youtube.com/watch?v=IfcpzBbbamk',
    time: 'Today 9:30 pm', ago: '3 hrs ago', expanded: false,
  },
  {
    type: 'image-message', author: 'Vlad', surname: 'Lugovsky',
    header: 'Added new image', text: '"My little kitten"',
    preview: 'app/feed/my-little-kitten.png',
    link: 'http://api.ning.com/files/DtcI2O2Ry7A7VhVxeiWfGU9WkHcMy4WSTWZ79oxJq*h0iXvVGndfD7CIYy-Ax-UAFCBCdqXI4GCBw3FOLKTTjQc*2cmpdOXJ/1082127884.jpeg',
    time: 'Today 2:20 pm', ago: '10 hrs ago', expanded: false,
  },
  {
    type: 'text-message', author: 'Nasta', surname: 'Linnie',
    header: 'Posted new message', text: 'Haha lol',
    time: '11.11.2015', ago: '2 days ago', expanded: false,
  },
  {
    type: 'geo-message', author: 'Nick', surname: 'Cat',
    header: 'Posted location', text: '"New York, USA"',
    preview: 'app/feed/new-york-location.png',
    link: 'https://www.google.by/maps/place/New+York,+NY,+USA/@40.7201111,-73.9893872,14z',
    time: '11.11.2015', ago: '2 days ago', expanded: false,
  },
  {
    type: 'text-message', author: 'Vlad', surname: 'Lugovsky',
    header: 'Posted new message',
    text: "First snake: I hope I'm not poisonous. Second snake: Why? First snake: Because I bit my lip!",
    time: '12.11.2015', ago: '3 days ago', expanded: false,
  },
  {
    type: 'text-message', author: 'Andrey', surname: 'Hrabouski',
    header: 'Posted new message',
    text: 'How do you smuggle an elephant across the border? Put a slice of bread on each side, and call him "lunch".',
    time: '14.11.2015', ago: '5 days ago', expanded: false,
  },
  {
    type: 'text-message', author: 'Nasta', surname: 'Linnie',
    header: 'Posted new message',
    text: 'When your hammer is C++, everything begins to look like a thumb.',
    time: '14.11.2015', ago: '5 days ago', expanded: false,
  },
  {
    type: 'text-message', author: 'Alexander', surname: 'Demeshko',
    header: 'Posted new message',
    text: '"I mean, they say you die twice. One time when you stop breathing and a second time, a bit later on, when somebody says your name for the last time." \u00a9',
    time: '15.11.2015', ago: '6 days ago', expanded: false,
  },
  {
    type: 'image-message', author: 'Nick', surname: 'Cat',
    header: 'Posted photo', text: '"Protein Heroes"',
    preview: 'app/feed/genom.png',
    link: 'https://dribbble.com/shots/2504810-Protein-Heroes',
    time: '16.11.2015', ago: '7 days ago', expanded: false,
  },
  {
    type: 'text-message', author: 'Kostya', surname: 'Danovsky',
    header: 'Posted new message',
    text: "Why did the CoffeeScript developer keep getting lost? Because he couldn't find his source without a map",
    time: '18.11.2015', ago: '9 days ago', expanded: false,
  }
];

function BlurFeed() {
  var [feed, setFeed] = useState(function () {
    return FEED_DATA.map(function (item) {
      return Object.assign({}, item);
    });
  });

  function expandMessage(index) {
    setFeed(function (prev) {
      return prev.map(function (msg, i) {
        if (i === index) {
          return Object.assign({}, msg, { expanded: !msg.expanded });
        }
        return msg;
      });
    });
  }

  return h('div', { className: 'feed-messages-container' },
    feed.map(function (message, i) {
      return h('div', {
        className: 'feed-message',
        key: i,
        onClick: function () { expandMessage(i); }
      },
        message.type === 'text-message'
          ? h('div', { className: 'message-icon' },
              h('img', { className: 'photo-icon', src: profilePicture(message.author) })
            )
          : h('div', { className: 'message-icon' },
              h('img', { className: 'photo-icon', src: profilePicture(message.author) }),
              h('span', { className: 'sub-photo-icon ' + message.type })
            ),
        h('div', { className: 'text-block text-message' },
          h('div', { className: 'message-header' },
            h('span', { className: 'author' }, message.author + ' ' + message.surname)
          ),
          h('div', { className: 'message-content line-clamp' + (!message.expanded ? ' line-clamp-2' : '') },
            message.preview ? h('span', null, message.header + ' ') : null,
            message.text
          ),
          message.preview && message.expanded
            ? h('div', { className: 'preview' },
                h('a', { href: message.link, target: '_blank' },
                  h('img', { src: appImage(message.preview) })
                )
              )
            : null,
          message.expanded
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

// ======================== DashboardTodo ========================

function DashboardTodo({ baConfig }) {
  var dashboardColors = baConfig.colors.dashboard;
  var transparent = baConfig.theme.blur;

  var colorsRef = useRef(null);
  if (!colorsRef.current) {
    var c = [];
    for (var key in dashboardColors) {
      c.push(dashboardColors[key]);
    }
    colorsRef.current = c;
  }

  function getRandomColor() {
    var i = Math.floor(Math.random() * (colorsRef.current.length - 1));
    return colorsRef.current[i];
  }

  var [todoList, setTodoList] = useState(function () {
    return [
      { text: 'Check me out' },
      { text: 'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro' },
      { text: 'Ex has semper alterum, expetenda dignissim' },
      { text: 'Vim an eius ocurreret abhorreant, id nam aeque persius ornatus.' },
      { text: 'Simul erroribus ad usu' },
      { text: 'Ei cum solet appareat, ex est graeci mediocritatem' },
      { text: 'Get in touch with akveo team' },
      { text: 'Write email to business cat' },
      { text: 'Have fun with blur admin' },
      { text: 'What do you think?' },
    ].map(function (item) {
      return { text: item.text, color: getRandomColor(), deleted: false };
    });
  });
  var [newTodoText, setNewTodoText] = useState('');

  function addItem() {
    setTodoList(function (prev) {
      return [{ text: newTodoText, color: getRandomColor(), deleted: false }].concat(prev);
    });
    setNewTodoText('');
  }

  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      addItem();
    }
  }

  function removeItem(index) {
    setTodoList(function (prev) {
      return prev.map(function (item, i) {
        if (i === index) {
          return Object.assign({}, item, { deleted: true });
        }
        return item;
      });
    });
  }

  var visibleItems = todoList.filter(function (item) { return !item.deleted; });

  return h('div', { className: 'task-todo-container' + (transparent ? ' transparent' : '') },
    h('input', {
      type: 'text',
      className: 'form-control task-todo',
      placeholder: 'Task to do..',
      value: newTodoText,
      onChange: function (e) { setNewTodoText(e.target.value); },
      onKeyUp: handleKeyUp
    }),
    h('i', { className: 'add-item-icon ion-plus-round', onClick: addItem }),
    h('div', { className: 'box-shadow-border' }),
    h('ul', { className: 'todo-list' },
      visibleItems.map(function (item, i) {
        return h('li', { key: i },
          h('div', { className: 'blur-container' },
            h('div', { className: 'blur-box' })
          ),
          h('i', { className: 'mark', style: { backgroundColor: item.color } }),
          h('label', { className: 'todo-checkbox custom-checkbox custom-input-success' },
            h('input', { type: 'checkbox', defaultChecked: false }),
            h('span', { className: 'cut-with-dots' }, item.text)
          ),
          h('i', {
            className: 'remove-todo ion-ios-close-empty',
            onClick: function (e) {
              e.stopPropagation();
              removeItem(todoList.indexOf(item));
            }
          })
        );
      })
    )
  );
}

// ======================== DashboardCalendar ========================

function DashboardCalendar({ baConfig }) {
  var dashboardColors = baConfig.colors.dashboard;
  var calendarRef = useRef(null);

  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !calendarRef.current) return;

    var $element = $(calendarRef.current).fullCalendar({
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
          eventData = {
            title: title,
            start: start,
            end: end
          };
          $element.fullCalendar('renderEvent', eventData, true);
        }
        $element.fullCalendar('unselect');
      },
      editable: true,
      eventLimit: true,
      events: [
        {
          title: 'All Day Event',
          start: '2016-03-01',
          color: dashboardColors.silverTree
        },
        {
          title: 'Long Event',
          start: '2016-03-07',
          end: '2016-03-10',
          color: dashboardColors.blueStone
        },
        {
          title: 'Dinner',
          start: '2016-03-14T20:00:00',
          color: dashboardColors.surfieGreen
        },
        {
          title: 'Birthday Party',
          start: '2016-04-01T07:00:00',
          color: dashboardColors.gossipDark
        }
      ]
    });
  }, []);

  return h('div', { id: 'calendar', className: 'blurCalendar', ref: calendarRef });
}

// ======================== DashboardPage (main) ========================

export function DashboardPage({ baConfig, layoutPaths }) {
  return h('div', null,
    // Pie Charts
    h(DashboardPieCharts, { baConfig: baConfig }),

    // Acquisition Channels + Users by Country
    h('div', { className: 'row' },
      h('div', { className: 'col-lg-6 col-md-12 col-sm-12' },
        h(Panel, { title: 'Acquisition Channels', panelClass: 'medium-panel traffic-panel' },
          h(TrafficChart, { baConfig: baConfig })
        )
      ),
      h('div', { className: 'col-lg-6 col-md-12 col-sm-12' },
        h(Panel, { title: 'Users by Country', panelClass: 'medium-panel' },
          h(DashboardMap, { baConfig: baConfig, layoutPaths: layoutPaths })
        )
      )
    ),

    // Revenue + Popular App + Feed
    h('div', { className: 'row' },
      h('div', { className: 'col-xlg-9 col-lg-6 col-md-6 col-sm-12 col-xs-12' },
        h('div', { className: 'row' },
          h('div', { className: 'col-xlg-8 col-lg-12 col-md-12 col-sm-7 col-xs-12' },
            h(Panel, { title: 'Revenue', panelClass: 'medium-panel' },
              h(DashboardLineChart, { baConfig: baConfig, layoutPaths: layoutPaths })
            )
          ),
          h('div', { className: 'col-xlg-4 col-lg-12 col-md-12 col-sm-5 col-xs-12' },
            h(Panel, { panelClass: 'popular-app medium-panel' },
              h(PopularApp)
            )
          )
        )
      ),
      h('div', { className: 'col-xlg-3 col-lg-6 col-md-6 col-sm-12 col-xs-12' },
        h(Panel, { title: 'Feed', panelClass: 'large-panel with-scroll feed-panel' },
          h(BlurFeed)
        )
      )
    ),

    // Todo + Calendar
    h('div', { className: 'row shift-up' },
      h('div', { className: 'col-xlg-3 col-lg-6 col-md-6 col-xs-12' },
        h(Panel, { title: 'To Do List', panelClass: 'xmedium-panel feed-comply-panel with-scroll todo-panel' },
          h(DashboardTodo, { baConfig: baConfig })
        )
      ),
      h('div', { className: 'col-xlg-6 col-lg-6 col-md-6 col-xs-12' },
        h(Panel, { title: 'Calendar', panelClass: 'xmedium-panel feed-comply-panel with-scroll calendar-panel' },
          h(DashboardCalendar, { baConfig: baConfig })
        )
      )
    )
  );
}
