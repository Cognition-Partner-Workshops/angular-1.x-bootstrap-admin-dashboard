/**
 * BasicTablesPage — React migration of src/app/pages/tables/basic/tables.html
 * and the metrics/people/contextual datasets from TablesPageCtrl.js.
 */
import React from 'react';
import { Panel } from '../components/Panel';
import {
  metricsTableData,
  peopleTableData,
  basicPeopleData,
  contextualRowClasses,
  smartTableData,
  appImage,
} from './tablesData';

function Arrow({ up }) {
  return React.createElement('i', { className: up ? 'icon-up' : 'icon-down' });
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
                <td><img src={appImage(item.image)} width="20" height="20" /></td>
                <td className="nowrap">{item.browser}</td>
                <td className="align-right">{item.visits}</td>
                <td className="table-arr"><Arrow up={item.isVisitsUp} /></td>
                <td className="align-right">{item.purchases}</td>
                <td className="table-arr"><Arrow up={item.isPurchasesUp} /></td>
                <td className="align-right">{item.percent}</td>
                <td className="table-arr"><Arrow up={item.isPercentUp} /></td>
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
                <td><img src={appImage(item.image)} width="20" height="20" /></td>
                <td className="nowrap">{item.browser}</td>
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

function StripedRowsTable({ data }) {
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
          {data.map(function (item) {
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
        {basicPeopleData.map(function (item, i) {
          return (
            <tr key={item.id} className={contextualRowClasses[i]}>
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
          {basicPeopleData.map(function (item) {
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
            <StripedRowsTable data={smartTableData} />
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
