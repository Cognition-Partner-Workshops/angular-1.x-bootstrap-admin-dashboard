"use client";

import React from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";
import { TodoWidget } from "@/components/dashboard/TodoWidget";
import { TrafficChart } from "@/components/dashboard/TrafficChart";
import { DashboardLineChart } from "@/components/dashboard/LineChart";
import { FeedWidget } from "@/components/dashboard/FeedWidget";
import { PieChartWidget } from "@/components/dashboard/PieChartWidget";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { PopularApp } from "@/components/dashboard/PopularApp";
import { MapWidget } from "@/components/dashboard/MapWidget";

export default function DashboardPage() {
  return (
    <div>
      <ContentTop title="Dashboard" />

      <PieChartWidget />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Panel title="Acquisition Channels">
          <TrafficChart />
        </Panel>
        <Panel title="Users by Country">
          <MapWidget />
        </Panel>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
        <div className="xl:col-span-2">
          <Panel title="Revenue">
            <DashboardLineChart />
          </Panel>
        </div>
        <div className="xl:col-span-1">
          <Panel>
            <PopularApp />
          </Panel>
        </div>
        <div className="xl:col-span-1">
          <Panel title="Feed" className="h-[400px] overflow-y-auto">
            <FeedWidget />
          </Panel>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Panel title="To Do List" className="h-[400px]">
          <TodoWidget />
        </Panel>
        <div className="lg:col-span-2">
          <Panel title="Calendar">
            <CalendarWidget />
          </Panel>
        </div>
      </div>
    </div>
  );
}
