"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { colors } from "@/lib/theme";

const data = [
  { name: "Other", value: 2000, percentage: 87 },
  { name: "Search engines", value: 1500, percentage: 22 },
  { name: "Referral Traffic", value: 1000, percentage: 70 },
  { name: "Direct Traffic", value: 1200, percentage: 38 },
  { name: "Ad Campaigns", value: 400, percentage: 17 },
];

const COLORS = [
  colors.dashboard.white,
  colors.dashboard.blueStone,
  colors.dashboard.surfieGreen,
  colors.dashboard.silverTree,
  colors.dashboard.gossip,
];

export function TrafficChart() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-6">
      <div className="w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${(value ?? 0).toLocaleString()} visits`, ""]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex-1 space-y-3">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: COLORS[index] }}
            />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-medium text-gray-800">{item.percentage}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: COLORS[index],
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
