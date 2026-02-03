"use client";

import React from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";
import { MapPin, Globe, Navigation } from "lucide-react";

const locations = [
  { id: 1, name: "New York", country: "USA", lat: 40.7128, lng: -74.006, users: 1250 },
  { id: 2, name: "London", country: "UK", lat: 51.5074, lng: -0.1278, users: 980 },
  { id: 3, name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, users: 875 },
  { id: 4, name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, users: 650 },
  { id: 5, name: "Paris", country: "France", lat: 48.8566, lng: 2.3522, users: 720 },
  { id: 6, name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405, users: 580 },
  { id: 7, name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198, users: 490 },
  { id: 8, name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, users: 420 },
];

const regionStats = [
  { region: "North America", users: 2850, percentage: 35, color: "#209e91" },
  { region: "Europe", users: 2100, percentage: 26, color: "#2dacd1" },
  { region: "Asia Pacific", users: 1890, percentage: 23, color: "#90b900" },
  { region: "Middle East", users: 680, percentage: 8, color: "#dfb81c" },
  { region: "Others", users: 650, percentage: 8, color: "#e85656" },
];

export default function MapsPage() {
  return (
    <div>
      <ContentTop title="Maps" />

      <div className="space-y-6">
        <Panel title="World Map - User Distribution">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: "400px" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-16 h-16 text-[#209e91] mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Interactive Map Placeholder</p>
                <p className="text-sm text-gray-500">
                  In production, integrate with a mapping library like Leaflet, Mapbox, or Google Maps
                </p>
              </div>
            </div>
            
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <h4 className="font-medium text-gray-800 mb-2">Global Users</h4>
              <p className="text-2xl font-bold text-[#209e91]">8,170</p>
              <p className="text-sm text-gray-500">Active users worldwide</p>
            </div>

            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-[#209e91]" />
                <span className="text-gray-600">High activity</span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-1">
                <div className="w-3 h-3 rounded-full bg-[#90b900]" />
                <span className="text-gray-600">Medium activity</span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-1">
                <div className="w-3 h-3 rounded-full bg-[#dfb81c]" />
                <span className="text-gray-600">Low activity</span>
              </div>
            </div>
          </div>
        </Panel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Panel title="Top Locations">
            <div className="space-y-3">
              {locations.map((location, index) => (
                <div
                  key={location.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-[#209e91] rounded-full flex items-center justify-center text-white font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#209e91]" />
                      <span className="font-medium text-gray-800">{location.name}</span>
                      <span className="text-sm text-gray-500">({location.country})</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-800">{location.users.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">users</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Regional Distribution">
            <div className="space-y-4">
              {regionStats.map((region) => (
                <div key={region.region}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700">{region.region}</span>
                    <span className="text-sm text-gray-500">
                      {region.users.toLocaleString()} users ({region.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${region.percentage}%`,
                        backgroundColor: region.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#209e91]">156</div>
                  <div className="text-sm text-gray-500">Countries</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#2dacd1]">8,170</div>
                  <div className="text-sm text-gray-500">Total Users</div>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <Panel title="Location Details">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Country</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Coordinates</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Users</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location) => (
                  <tr key={location.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#209e91]" />
                        <span className="font-medium text-gray-800">{location.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{location.country}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                    </td>
                    <td className="py-3 px-4 text-gray-800">{location.users.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          location.users > 800
                            ? "bg-green-100 text-green-700"
                            : location.users > 500
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {location.users > 800 ? "High" : location.users > 500 ? "Medium" : "Growing"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Map Integration Guide">
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              To add interactive maps to your application, you can integrate with popular mapping libraries:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="w-5 h-5 text-[#209e91]" />
                  <h4 className="font-medium text-gray-800">Leaflet</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Open-source JavaScript library for mobile-friendly interactive maps.
                </p>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 block">
                  npm install leaflet react-leaflet
                </code>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="w-5 h-5 text-[#2dacd1]" />
                  <h4 className="font-medium text-gray-800">Mapbox GL</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Beautiful, customizable maps with powerful features and styling options.
                </p>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 block">
                  npm install mapbox-gl react-map-gl
                </code>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="w-5 h-5 text-[#90b900]" />
                  <h4 className="font-medium text-gray-800">Google Maps</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Industry-standard mapping solution with extensive documentation.
                </p>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 block">
                  npm install @react-google-maps/api
                </code>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
