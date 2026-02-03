"use client";

import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { colors } from "@/lib/theme";

const data = [
  { month: "Jan", revenue: 4000, profit: 2400 },
  { month: "Feb", revenue: 3000, profit: 1398 },
  { month: "Mar", revenue: 2000, profit: 9800 },
  { month: "Apr", revenue: 2780, profit: 3908 },
  { month: "May", revenue: 1890, profit: 4800 },
  { month: "Jun", revenue: 2390, profit: 3800 },
  { month: "Jul", revenue: 3490, profit: 4300 },
  { month: "Aug", revenue: 4000, profit: 2400 },
  { month: "Sep", revenue: 3000, profit: 1398 },
  { month: "Oct", revenue: 2000, profit: 9800 },
  { month: "Nov", revenue: 2780, profit: 3908 },
  { month: "Dec", revenue: 1890, profit: 4800 },
];

export function DashboardLineChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
              <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.info} stopOpacity={0.3} />
              <stop offset="95%" stopColor={colors.info} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#999" />
          <YAxis tick={{ fontSize: 12 }} stroke="#999" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
            formatter={(value) => [`$${(value ?? 0).toLocaleString()}`, ""]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={colors.primary}
            fillOpacity={1}
            fill="url(#colorRevenue)"
            strokeWidth={2}
            name="Revenue"
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke={colors.info}
            fillOpacity={1}
            fill="url(#colorProfit)"
            strokeWidth={2}
            name="Profit"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
