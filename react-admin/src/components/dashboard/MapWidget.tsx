"use client";

import React from "react";
import { colors } from "@/lib/theme";

interface CountryData {
  name: string;
  code: string;
  users: number;
  percentage: number;
}

const countryData: CountryData[] = [
  { name: "United States", code: "US", users: 12500, percentage: 35 },
  { name: "Germany", code: "DE", users: 8200, percentage: 23 },
  { name: "France", code: "FR", users: 5600, percentage: 16 },
  { name: "United Kingdom", code: "GB", users: 4800, percentage: 13 },
  { name: "Canada", code: "CA", users: 3200, percentage: 9 },
  { name: "Other", code: "OT", users: 1400, percentage: 4 },
];

export function MapWidget() {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-[#005562] to-[#0e8174] rounded-lg p-6 text-white">
        <div className="text-center mb-4">
          <h4 className="text-lg font-medium">Global Users</h4>
          <p className="text-3xl font-bold mt-2">35,700</p>
          <p className="text-sm opacity-80">Total active users</p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xl font-semibold">156</p>
            <p className="text-xs opacity-80">Countries</p>
          </div>
          <div>
            <p className="text-xl font-semibold">89%</p>
            <p className="text-xs opacity-80">Growth</p>
          </div>
          <div>
            <p className="text-xl font-semibold">4.8</p>
            <p className="text-xs opacity-80">Rating</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {countryData.map((country) => (
          <div key={country.code} className="flex items-center gap-3">
            <div className="w-8 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-medium text-gray-600">
              {country.code}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700">{country.name}</span>
                <span className="text-sm font-medium text-gray-800">
                  {country.users.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${country.percentage}%`,
                    backgroundColor: colors.primary,
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
