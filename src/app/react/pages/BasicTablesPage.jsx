import React from 'react';
import { Panel } from '../components/Panel';
import {
  appImage,
  metricsTableData,
  smartTableData,
  peopleTableData,
  contextualTableData,
  responsiveTableData
} from './tablesData';

function HoverRowsTable() {
  return React.createElement('div', { className: 'horizontal-scroll' },
    React.createElement('table', { className: 'table table-hover' },
      React.createElement('thead', null,
        React.createElement('tr', { className: 'black-muted-bg' },
          React.createElement('th', { className: 'browser-icons' }),
          React.createElement('th', null, 'Browser'),
          React.createElement('th', { className: 'align-right' }, 'Visits'),
          React.createElement('th', { className: 'table-arr' }),
          React.createElement('th', { className: 'align-right' }, 'Purchases'),
          React.createElement('th', { className: 'table-arr' }),
          React.createElement('th', { className: 'align-right' }, '%'),
          React.createElement('th', { className: 'table-arr' })
        )
      ),
      React.createElement('tbody', null,
        metricsTableData.map(function (item, i) {
          return React.createElement('tr', { key: i, className: 'no-top-border' },
            React.createElement('td', null,
              React.createElement('img', { src: appImage(item.image), width: '20', height: '20' })
            ),
            React.createElement('td', { className: 'nowrap' }, item.browser),
            React.createElement('td', { className: 'align-right' }, item.visits),
            React.createElement('td', { className: 'table-arr' },
              React.createElement('i', { className: item.isVisitsUp ? 'icon-up' : 'icon-down' })
            ),
            React.createElement('td', { className: 'align-right' }, item.purchases),
            React.createElement('td', { className: 'table-arr' },
              React.createElement('i', { className: item.isPurchasesUp ? 'icon-up' : 'icon-down' })
            ),
            React.createElement('td', { className: 'align-right' }, item.percent),
            React.createElement('td', { className: 'table-arr' },
              React.createElement('i', { className: item.isPercentUp ? 'icon-up' : 'icon-down' })
            )
          );
        })
      )
    )
  );
}

function BorderedTable() {
  return React.createElement('div', { className: 'horizontal-scroll' },
    React.createElement('table', { className: 'table table-bordered' },
      React.createElement('thead', null,
        React.createElement('tr', null,
          React.createElement('th', { className: 'browser-icons' }),
          React.createElement('th', null, 'Browser'),
          React.createElement('th', { className: 'align-right' }, 'Visits'),
          React.createElement('th', { className: 'align-right' }, 'Purchases'),
          React.createElement('th', { className: 'align-right' }, '%')
        )
      ),
      React.createElement('tbody', null,
        metricsTableData.map(function (item, i) {
          return React.createElement('tr', { key: i },
            React.createElement('td', null,
              React.createElement('img', { src: appImage(item.image), width: '20', height: '20' })
            ),
            React.createElement('td', { className: 'nowrap' }, item.browser),
            React.createElement('td', { className: 'align-right' }, item.visits),
            React.createElement('td', { className: 'align-right' }, item.purchases),
            React.createElement('td', { className: 'align-right' }, item.percent)
          );
        })
      )
    )
  );
}

function CondensedTable() {
  return React.createElement('div', { className: 'horizontal-scroll' },
    React.createElement('table', { className: 'table table-condensed' },
      React.createElement('thead', null,
        React.createElement('tr', null,
          React.createElement('th', { className: 'table-id' }, '#'),
          React.createElement('th', null, 'First Name'),
          React.createElement('th', null, 'Last Name'),
          React.createElement('th', null, 'Username'),
          React.createElement('th', null, 'Email'),
          React.createElement('th', null, 'Status')
        )
      ),
      React.createElement('tbody', null,
        peopleTableData.map(function (item, i) {
          return React.createElement('tr', { key: i },
            React.createElement('td', { className: 'table-id' }, item.id),
            React.createElement('td', null, item.firstName),
            React.createElement('td', null, item.lastName),
            React.createElement('td', null, item.username),
            React.createElement('td', null,
              React.createElement('a', { className: 'email-link', href: 'mailto:' + item.email }, item.email)
            ),
            React.createElement('td', null,
              React.createElement('button', {
                className: 'status-button btn btn-xs btn-' + item.status
              }, item.status)
            )
          );
        })
      )
    )
  );
}

function StripedRowsTable() {
  return React.createElement('div', { className: 'vertical-scroll' },
    React.createElement('table', { className: 'table table-striped' },
      React.createElement('thead', null,
        React.createElement('tr', null,
          React.createElement('th', { className: 'table-id' }, '#'),
          React.createElement('th', null, 'First Name'),
          React.createElement('th', null, 'Last Name'),
          React.createElement('th', null, 'Username'),
          React.createElement('th', null, 'Email'),
          React.createElement('th', null, 'Age')
        )
      ),
      React.createElement('tbody', null,
        smartTableData.map(function (item, i) {
          return React.createElement('tr', { key: i },
            React.createElement('td', { className: 'table-id' }, item.id),
            React.createElement('td', null, item.firstName),
            React.createElement('td', null, item.lastName),
            React.createElement('td', null, item.username),
            React.createElement('td', null,
              React.createElement('a', { className: 'email-link', href: 'mailto:' + item.email }, item.email)
            ),
            React.createElement('td', null, item.age)
          );
        })
      )
    )
  );
}

function ContextualTable() {
  return React.createElement('table', { className: 'table' },
    React.createElement('tbody', null,
      React.createElement('tr', null,
        React.createElement('th', null, '#'),
        React.createElement('th', null, 'First Name'),
        React.createElement('th', null, 'Last Name'),
        React.createElement('th', null, 'Username'),
        React.createElement('th', null, 'Email'),
        React.createElement('th', null, 'Age')
      ),
      contextualTableData.map(function (item) {
        return React.createElement('tr', { key: item.id, className: item.rowClass },
          React.createElement('td', null, item.id),
          React.createElement('td', null, item.firstName),
          React.createElement('td', null, item.lastName),
          React.createElement('td', null, item.username),
          React.createElement('td', null,
            React.createElement('a', { className: 'email-link', href: 'mailto:' + item.email }, item.email)
          ),
          React.createElement('td', null, item.age)
        );
      })
    )
  );
}

function ResponsiveTable() {
  return React.createElement('div', { className: 'table-responsive' },
    React.createElement('table', { className: 'table' },
      React.createElement('tbody', null,
        React.createElement('tr', null,
          React.createElement('th', null, '#'),
          React.createElement('th', null, 'First Name'),
          React.createElement('th', null, 'Last Name'),
          React.createElement('th', null, 'Username'),
          React.createElement('th', null, 'Email'),
          React.createElement('th', null, 'Age')
        ),
        responsiveTableData.map(function (item) {
          return React.createElement('tr', { key: item.id },
            React.createElement('td', null, item.id),
            React.createElement('td', null, item.firstName),
            React.createElement('td', null, item.lastName),
            React.createElement('td', null, item.username),
            React.createElement('td', null,
              React.createElement('a', { className: 'email-link', href: 'mailto:' + item.email }, item.email)
            ),
            React.createElement('td', null, item.age)
          );
        })
      )
    )
  );
}

export function BasicTablesPage() {
  return React.createElement('div', { className: 'widgets' },
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-lg-6 col-md-12' },
        React.createElement(Panel, { title: 'Hover Rows', panelClass: 'with-scroll table-panel' },
          React.createElement(HoverRowsTable)
        )
      ),
      React.createElement('div', { className: 'col-lg-6 col-md-12' },
        React.createElement(Panel, { title: 'Bordered Table', panelClass: 'with-scroll table-panel' },
          React.createElement(BorderedTable)
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-lg-6 col-md-12' },
        React.createElement(Panel, { title: 'Condensed Table', panelClass: 'with-scroll table-panel' },
          React.createElement(CondensedTable)
        )
      ),
      React.createElement('div', { className: 'col-lg-6 col-md-12' },
        React.createElement(Panel, { title: 'Striped Rows', panelClass: 'with-scroll table-panel' },
          React.createElement(StripedRowsTable)
        )
      )
    ),
    React.createElement('div', { className: 'row' },
      React.createElement('div', { className: 'col-lg-6 col-md-12' },
        React.createElement(Panel, { title: 'Contextual Table', panelClass: 'with-scroll table-panel' },
          React.createElement(ContextualTable)
        )
      ),
      React.createElement('div', { className: 'col-lg-6 col-md-12' },
        React.createElement(Panel, { title: 'Responsive Table', panelClass: 'with-scroll table-panel' },
          React.createElement(ResponsiveTable)
        )
      )
    )
  );
}
