import React from 'react';
import Panel from './Panel';
import DashboardPieChart from './DashboardPieChart';
import TrafficChart from './TrafficChart';
import DashboardMap from './DashboardMap';
import DashboardLineChart from './DashboardLineChart';
import PopularApp from './PopularApp';
import BlurFeed from './BlurFeed';
import DashboardTodo from './DashboardTodo';
import DashboardCalendar from './DashboardCalendar';

function Dashboard() {
  return (
    <div>
      <DashboardPieChart />

      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <Panel title="Acquisition Channels" panelClass="medium-panel traffic-panel">
            <TrafficChart />
          </Panel>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <Panel title="Users by Country" panelClass="medium-panel">
            <DashboardMap />
          </Panel>
        </div>
      </div>

      <div className="row">
        <div className="col-xlg-9 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-xlg-8 col-lg-12 col-md-12 col-sm-7 col-xs-12">
              <Panel title="Revenue" panelClass="medium-panel">
                <DashboardLineChart />
              </Panel>
            </div>
            <div className="col-xlg-4 col-lg-12 col-md-12 col-sm-5 col-xs-12">
              <Panel panelClass="popular-app medium-panel">
                <PopularApp />
              </Panel>
            </div>
          </div>
        </div>
        <div className="col-xlg-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <Panel title="Feed" panelClass="large-panel with-scroll feed-panel">
            <BlurFeed />
          </Panel>
        </div>
      </div>

      <div className="row shift-up">
        <div className="col-xlg-3 col-lg-6 col-md-6 col-xs-12">
          <Panel title="To Do List" panelClass="xmedium-panel feed-comply-panel with-scroll todo-panel">
            <DashboardTodo />
          </Panel>
        </div>
        <div className="col-xlg-6 col-lg-6 col-md-6 col-xs-12">
          <Panel title="Calendar" panelClass="xmedium-panel feed-comply-panel with-scroll calendar-panel">
            <DashboardCalendar />
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
