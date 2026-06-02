/**
 * DashboardCalendar — React port of the AngularJS dashboard-calendar directive
 * (DashboardCalendarCtrl + dashboardCalendar.html). The "Calendar" widget.
 *
 * Initialises the jQuery FullCalendar plugin against #calendar in a useEffect.
 */
import React, { useEffect } from 'react';

export function DashboardCalendar({ baConfig }) {
  useEffect(function () {
    var $ = window.jQuery;
    if (!$ || !$.fn || !$.fn.fullCalendar) {
      return undefined;
    }

    var dashboardColors = baConfig.colors.dashboard;
    var $element = $('#calendar');

    $element.fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay',
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
        { title: 'Birthday Party', start: '2016-04-01T07:00:00', color: dashboardColors.gossipDark },
      ],
    });

    return function () {
      $element.fullCalendar('destroy');
    };
  }, []);

  return (
    <dashboard-calendar>
      <div id="calendar" className="blurCalendar"></div>
    </dashboard-calendar>
  );
}
