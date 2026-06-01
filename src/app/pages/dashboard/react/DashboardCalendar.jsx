import React, { useEffect } from 'react';

var dashboardColors = {
  blueStone: '#005562',
  surfieGreen: '#0e8174',
  silverTree: '#6eba8c',
  gossip: '#b9f2a1',
  gossipDark: '#8eac50'
};

function DashboardCalendar() {
  useEffect(function () {
    if (window.$ && window.$.fn.fullCalendar) {
      var $element = window.$('#calendar').fullCalendar({
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
    }
  }, []);

  return <div id="calendar" className="blurCalendar"></div>;
}

export default DashboardCalendar;
