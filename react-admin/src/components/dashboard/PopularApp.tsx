"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface AppItem {
  name: string;
  users: string;
  trend: "up" | "down";
  change: string;
}

const apps: AppItem[] = [
  { name: "Gmail", users: "15,234", trend: "up", change: "+12%" },
  { name: "Twitter", users: "8,567", trend: "up", change: "+8%" },
  { name: "Instagram", users: "7,890", trend: "down", change: "-3%" },
  { name: "Facebook", users: "6,432", trend: "up", change: "+5%" },
  { name: "LinkedIn", users: "4,321", trend: "down", change: "-2%" },
];

export function PopularApp() {
  return (
    <div>
      <h4 className="text-lg font-medium text-gray-800 mb-4">Popular App</h4>
      <div className="space-y-4">
        {apps.map((app, index) => (
          <div key={app.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-gray-800">{app.name}</p>
                <p className="text-xs text-gray-500">{app.users} users</p>
              </div>
            </div>
            <div
              className={`flex items-center gap-1 text-sm ${
                app.trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {app.trend === "up" ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {app.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
