"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { colors } from "@/lib/theme";

const data = [
  { name: "USA", value: 4000, color: colors.dashboard.blueStone },
  { name: "Germany", value: 3000, color: colors.dashboard.surfieGreen },
  { name: "France", value: 2000, color: colors.dashboard.silverTree },
  { name: "Canada", value: 2780, color: colors.dashboard.gossip },
  { name: "Italy", value: 1890, color: colors.dashboard.white },
];

export function PieChartWidget() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[0, 1, 2].map((chartIndex) => (
        <div key={chartIndex} className="bg-white rounded-lg p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-600 mb-4 text-center">
            {chartIndex === 0 ? "New Visits" : chartIndex === 1 ? "Purchases" : "Active Users"}
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={chartIndex === 1 ? 40 : 0}
                  outerRadius={60}
                  paddingAngle={chartIndex === 2 ? 5 : 0}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [(value ?? 0).toLocaleString(), ""]}
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
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {data.slice(0, 3).map((item) => (
              <div key={item.name} className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
