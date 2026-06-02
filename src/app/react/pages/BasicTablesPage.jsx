/**
 * BasicTablesPage — React migration of src/app/pages/tables/basic/tables.html
 * and its widgets (hoverRows, borderedTable, condensedTable, stripedRows,
 * contextualTable, responsiveTable).
 *
 * Bridged into AngularJS via the `tablesBasicReact` directive (tablesReact.js)
 * for the `tables.basic` UI-Router state (#/tables/basic).
 */
import React from 'react';
import { Panel } from '../components/Panel';
import { metricsTableData, peopleTableData, smartTableData } from '../data/tablesData';

var IMAGES_ROOT = 'assets/img/';

function appImage(input) {
  return IMAGES_ROOT + input;
}

function trendIcon(isUp) {
  return React.createElement('i', { className: isUp ? 'icon-up' : 'icon-down' });
}

function HoverRowsTable() {
  return (
    <div className="horizontal-scroll">
      <table className="table table-hover">
        <thead>
          <tr className="black-muted-bg">
            <th className="browser-icons"></th>
            <th>Browser</th>
            <th className="align-right">Visits</th>
            <th className="table-arr"></th>
            <th className="align-right">Purchases</th>
            <th className="table-arr"></th>
            <th className="align-right">%</th>
            <th className="table-arr"></th>
          </tr>
        </thead>
        <tbody>
          {metricsTableData.map(function (item) {
            return (
              <tr key={item.browser} className="no-top-border">
                <td><img src={appImage(item.image)} width="20" height="20" alt={item.browser} /></td>
                <td>{item.browser}</td>
                <td className="align-right">{item.visits}</td>
                <td className="table-arr">{trendIcon(item.isVisitsUp)}</td>
                <td className="align-right">{item.purchases}</td>
                <td className="table-arr">{trendIcon(item.isPurchasesUp)}</td>
                <td className="align-right">{item.percent}</td>
                <td className="table-arr">{trendIcon(item.isPercentUp)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BorderedTable() {
  return (
    <div className="horizontal-scroll">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="browser-icons"></th>
            <th>Browser</th>
            <th className="align-right">Visits</th>
            <th className="align-right">Purchases</th>
            <th className="align-right">%</th>
          </tr>
        </thead>
        <tbody>
          {metricsTableData.map(function (item) {
            return (
              <tr key={item.browser}>
                <td><img src={appImage(item.image)} width="20" height="20" alt={item.browser} /></td>
                <td>{item.browser}</td>
                <td className="align-right">{item.visits}</td>
                <td className="align-right">{item.purchases}</td>
                <td className="align-right">{item.percent}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function CondensedTable() {
  return (
    <div className="horizontal-scroll">
      <table className="table table-condensed">
        <thead>
          <tr>
            <th className="table-id">#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {peopleTableData.map(function (item) {
            return (
              <tr key={item.id}>
                <td className="table-id">{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.username}</td>
                <td><a className="email-link" href={'mailto:' + item.email}>{item.email}</a></td>
                <td><button className={'status-button btn btn-xs btn-' + item.status}>{item.status}</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StripedRowsTable() {
  return (
    <div className="vertical-scroll">
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="table-id">#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {smartTableData.map(function (item) {
            return (
              <tr key={item.id}>
                <td className="table-id">{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.username}</td>
                <td><a className="email-link" href={'mailto:' + item.email}>{item.email}</a></td>
                <td>{item.age}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Contextual and responsive tables use a fixed sample of 5 rows, matching the
// original static templates exactly (including the contextual row classes).
var sampleRows = [
  { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo', email: 'mdo@gmail.com', age: 28, ctx: 'primary' },
  { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat', email: 'fat@yandex.ru', age: 45, ctx: 'success' },
  { id: 3, firstName: 'Larry', lastName: 'Bird', username: '@twitter', email: 'twitter@outlook.com', age: 18, ctx: 'warning' },
  { id: 4, firstName: 'John', lastName: 'Snow', username: '@snow', email: 'snow@gmail.com', age: 20, ctx: 'danger' },
  { id: 5, firstName: 'Jack', lastName: 'Sparrow', username: '@jack', email: 'jack@yandex.ru', age: 30, ctx: 'info' },
];

function ContextualTable() {
  return (
    <table className="table">
      <tbody>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Age</th>
        </tr>
        {sampleRows.map(function (item) {
          return (
            <tr key={item.id} className={item.ctx}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.username}</td>
              <td><a className="email-link" href={'mailto:' + item.email}>{item.email}</a></td>
              <td>{item.age}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function ResponsiveTable() {
  return (
    <div className="table-responsive">
      <table className="table">
        <tbody>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
          {sampleRows.map(function (item) {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.username}</td>
                <td><a className="email-link" href={'mailto:' + item.email}>{item.email}</a></td>
                <td>{item.age}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function BasicTablesPage() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <Panel title="Hover Rows" panelClass="with-scroll table-panel">
            <HoverRowsTable />
          </Panel>
        </div>
        <div className="col-lg-6 col-md-12">
          <Panel title="Bordered Table" panelClass="with-scroll table-panel">
            <BorderedTable />
          </Panel>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <Panel title="Condensed Table" panelClass="with-scroll table-panel">
            <CondensedTable />
          </Panel>
        </div>
        <div className="col-lg-6 col-md-12">
          <Panel title="Striped Rows" panelClass="with-scroll table-panel">
            <StripedRowsTable />
          </Panel>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <Panel title="Contextual Table" panelClass="with-scroll table-panel">
            <ContextualTable />
          </Panel>
        </div>
        <div className="col-lg-6 col-md-12">
          <Panel title="Responsive Table" panelClass="with-scroll table-panel">
            <ResponsiveTable />
          </Panel>
        </div>
      </div>
    </div>
  );
}
