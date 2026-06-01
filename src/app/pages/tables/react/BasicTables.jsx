import React from 'react';
import Panel from './Panel';

var IMAGES_ROOT = 'assets/img/';

var metricsTableData = [
  { image: 'app/browsers/chrome.svg', browser: 'Google Chrome', visits: '10,392', isVisitsUp: true, purchases: '4,214', isPurchasesUp: true, percent: '45%', isPercentUp: true },
  { image: 'app/browsers/firefox.svg', browser: 'Mozilla Firefox', visits: '7,873', isVisitsUp: true, purchases: '3,031', isPurchasesUp: false, percent: '28%', isPercentUp: true },
  { image: 'app/browsers/ie.svg', browser: 'Internet Explorer', visits: '5,890', isVisitsUp: false, purchases: '2,102', isPurchasesUp: false, percent: '17%', isPercentUp: false },
  { image: 'app/browsers/safari.svg', browser: 'Safari', visits: '4,001', isVisitsUp: false, purchases: '1,001', isPurchasesUp: false, percent: '14%', isPercentUp: true },
  { image: 'app/browsers/opera.svg', browser: 'Opera', visits: '1,833', isVisitsUp: true, purchases: '83', isPurchasesUp: true, percent: '5%', isPercentUp: false }
];

var peopleTableData = [
  { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo', email: 'mdo@gmail.com', age: '28', status: 'info' },
  { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat', email: 'fat@yandex.ru', age: '45', status: 'primary' },
  { id: 3, firstName: 'Larry', lastName: 'Bird', username: '@twitter', email: 'twitter@outlook.com', age: '18', status: 'success' },
  { id: 4, firstName: 'John', lastName: 'Snow', username: '@snow', email: 'snow@gmail.com', age: '20', status: 'danger' },
  { id: 5, firstName: 'Jack', lastName: 'Sparrow', username: '@jack', email: 'jack@yandex.ru', age: '30', status: 'warning' }
];

var smartTableData = [
  { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo', email: 'mdo@gmail.com', age: '28' },
  { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat', email: 'fat@yandex.ru', age: '45' },
  { id: 3, firstName: 'Larry', lastName: 'Bird', username: '@twitter', email: 'twitter@outlook.com', age: '18' },
  { id: 4, firstName: 'John', lastName: 'Snow', username: '@snow', email: 'snow@gmail.com', age: '20' },
  { id: 5, firstName: 'Jack', lastName: 'Sparrow', username: '@jack', email: 'jack@yandex.ru', age: '30' },
  { id: 6, firstName: 'Ann', lastName: 'Smith', username: '@ann', email: 'ann@gmail.com', age: '21' },
  { id: 7, firstName: 'Barbara', lastName: 'Black', username: '@barbara', email: 'barbara@yandex.ru', age: '43' },
  { id: 8, firstName: 'Sevan', lastName: 'Bagrat', username: '@sevan', email: 'sevan@outlook.com', age: '13' },
  { id: 9, firstName: 'Ruben', lastName: 'Vardan', username: '@ruben', email: 'ruben@gmail.com', age: '22' },
  { id: 10, firstName: 'Karen', lastName: 'Sevan', username: '@karen', email: 'karen@yandex.ru', age: '33' }
];

function HoverRows() {
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
          {metricsTableData.map(function (item, i) {
            return (
              <tr key={i} className="no-top-border">
                <td><img src={IMAGES_ROOT + item.image} width="20" height="20" /></td>
                <td className="nowrap">{item.browser}</td>
                <td className="align-right">{item.visits}</td>
                <td className="table-arr"><i className={item.isVisitsUp ? 'icon-up' : 'icon-down'}></i></td>
                <td className="align-right">{item.purchases}</td>
                <td className="table-arr"><i className={item.isPurchasesUp ? 'icon-up' : 'icon-down'}></i></td>
                <td className="align-right">{item.percent}</td>
                <td className="table-arr"><i className={item.isPercentUp ? 'icon-up' : 'icon-down'}></i></td>
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
          {metricsTableData.map(function (item, i) {
            return (
              <tr key={i}>
                <td><img src={IMAGES_ROOT + item.image} width="20" height="20" /></td>
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

function StripedRows() {
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

function ContextualTable() {
  return (
    <table className="table">
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Age</th>
      </tr>
      <tr className="primary">
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td><a className="email-link" href="mailto:mdo@gmail.com">mdo@gmail.com</a></td>
        <td>28</td>
      </tr>
      <tr className="success">
        <td>2</td>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td><a className="email-link" href="mailto:fat@yandex.ru">fat@yandex.ru</a></td>
        <td>45</td>
      </tr>
      <tr className="warning">
        <td>3</td>
        <td>Larry</td>
        <td>Bird</td>
        <td>@twitter</td>
        <td><a className="email-link" href="mailto:twitter@outlook.com">twitter@outlook.com</a></td>
        <td>18</td>
      </tr>
      <tr className="danger">
        <td>4</td>
        <td>John</td>
        <td>Snow</td>
        <td>@snow</td>
        <td><a className="email-link" href="mailto:snow@gmail.com">snow@gmail.com</a></td>
        <td>20</td>
      </tr>
      <tr className="info">
        <td>5</td>
        <td>Jack</td>
        <td>Sparrow</td>
        <td>@jack</td>
        <td><a className="email-link" href="mailto:jack@yandex.ru">jack@yandex.ru</a></td>
        <td>30</td>
      </tr>
    </table>
  );
}

function ResponsiveTable() {
  return (
    <div className="table-responsive">
      <table className="table">
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Age</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td><a className="email-link" href="mailto:mdo@gmail.com">mdo@gmail.com</a></td>
          <td>28</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td><a className="email-link" href="mailto:fat@yandex.ru">fat@yandex.ru</a></td>
          <td>45</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Larry</td>
          <td>Bird</td>
          <td>@twitter</td>
          <td><a className="email-link" href="mailto:twitter@outlook.com">twitter@outlook.com</a></td>
          <td>18</td>
        </tr>
        <tr>
          <td>4</td>
          <td>John</td>
          <td>Snow</td>
          <td>@snow</td>
          <td><a className="email-link" href="mailto:snow@gmail.com">snow@gmail.com</a></td>
          <td>20</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Jack</td>
          <td>Sparrow</td>
          <td>@jack</td>
          <td><a className="email-link" href="mailto:jack@yandex.ru">jack@yandex.ru</a></td>
          <td>30</td>
        </tr>
      </table>
    </div>
  );
}

function BasicTables() {
  return (
    <div className="widgets">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <Panel title="Hover Rows" panelClass="with-scroll table-panel">
            <HoverRows />
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
            <StripedRows />
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

export default BasicTables;
