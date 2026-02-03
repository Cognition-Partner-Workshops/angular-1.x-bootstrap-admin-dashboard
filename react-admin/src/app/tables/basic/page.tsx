"use client";

import React from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";

const basicTableData = [
  { id: 1, firstName: "Mark", lastName: "Otto", username: "@mdo", email: "mark@example.com", age: 28 },
  { id: 2, firstName: "Jacob", lastName: "Thornton", username: "@fat", email: "jacob@example.com", age: 32 },
  { id: 3, firstName: "Larry", lastName: "Bird", username: "@twitter", email: "larry@example.com", age: 45 },
  { id: 4, firstName: "John", lastName: "Snow", username: "@snow", email: "john@example.com", age: 27 },
  { id: 5, firstName: "Daenerys", lastName: "Targaryen", username: "@mother", email: "daenerys@example.com", age: 24 },
];

const stripedTableData = [
  { id: 1, name: "Dashboard", status: "Active", date: "2024-01-15", progress: 85 },
  { id: 2, name: "Forms", status: "Pending", date: "2024-01-14", progress: 60 },
  { id: 3, name: "Charts", status: "Active", date: "2024-01-13", progress: 100 },
  { id: 4, name: "Tables", status: "Inactive", date: "2024-01-12", progress: 45 },
  { id: 5, name: "Maps", status: "Active", date: "2024-01-11", progress: 90 },
];

const borderedTableData = [
  { id: 1, product: "MacBook Pro", category: "Electronics", price: "$2,499", stock: 15 },
  { id: 2, product: "iPhone 15", category: "Electronics", price: "$999", stock: 50 },
  { id: 3, product: "AirPods Pro", category: "Accessories", price: "$249", stock: 100 },
  { id: 4, product: "iPad Air", category: "Electronics", price: "$599", stock: 30 },
  { id: 5, product: "Apple Watch", category: "Wearables", price: "$399", stock: 25 },
];

export default function BasicTablesPage() {
  return (
    <div>
      <ContentTop title="Basic Tables" />

      <div className="space-y-6">
        <Panel title="Basic Table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">#</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">First Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Last Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Username</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Age</th>
                </tr>
              </thead>
              <tbody>
                {basicTableData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{row.id}</td>
                    <td className="py-3 px-4 text-gray-800">{row.firstName}</td>
                    <td className="py-3 px-4 text-gray-800">{row.lastName}</td>
                    <td className="py-3 px-4 text-gray-600">{row.username}</td>
                    <td className="py-3 px-4 text-gray-600">{row.email}</td>
                    <td className="py-3 px-4 text-gray-800">{row.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Striped Table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">#</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Progress</th>
                </tr>
              </thead>
              <tbody>
                {stripedTableData.map((row, index) => (
                  <tr key={row.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-4 text-gray-800">{row.id}</td>
                    <td className="py-3 px-4 text-gray-800">{row.name}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : row.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{row.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#209e91] rounded-full"
                            style={{ width: `${row.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{row.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Bordered Table">
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead>
                <tr className="bg-[#209e91] text-white">
                  <th className="text-left py-3 px-4 font-medium border-r border-[#1b867b]">#</th>
                  <th className="text-left py-3 px-4 font-medium border-r border-[#1b867b]">Product</th>
                  <th className="text-left py-3 px-4 font-medium border-r border-[#1b867b]">Category</th>
                  <th className="text-left py-3 px-4 font-medium border-r border-[#1b867b]">Price</th>
                  <th className="text-left py-3 px-4 font-medium">Stock</th>
                </tr>
              </thead>
              <tbody>
                {borderedTableData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800 border-r border-gray-200">{row.id}</td>
                    <td className="py-3 px-4 text-gray-800 border-r border-gray-200">{row.product}</td>
                    <td className="py-3 px-4 text-gray-600 border-r border-gray-200">{row.category}</td>
                    <td className="py-3 px-4 text-gray-800 font-medium border-r border-gray-200">{row.price}</td>
                    <td className="py-3 px-4 text-gray-800">{row.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Condensed Table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 font-medium text-gray-600 text-sm">#</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-600 text-sm">First Name</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-600 text-sm">Last Name</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-600 text-sm">Username</th>
                </tr>
              </thead>
              <tbody>
                {basicTableData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100">
                    <td className="py-2 px-3 text-gray-800 text-sm">{row.id}</td>
                    <td className="py-2 px-3 text-gray-800 text-sm">{row.firstName}</td>
                    <td className="py-2 px-3 text-gray-800 text-sm">{row.lastName}</td>
                    <td className="py-2 px-3 text-gray-600 text-sm">{row.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Contextual Table">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">#</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Column heading</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Column heading</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Column heading</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50 text-green-800">
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">Success row content</td>
                  <td className="py-3 px-4">Success row content</td>
                  <td className="py-3 px-4">Success row content</td>
                </tr>
                <tr className="bg-blue-50 text-blue-800">
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4">Info row content</td>
                  <td className="py-3 px-4">Info row content</td>
                  <td className="py-3 px-4">Info row content</td>
                </tr>
                <tr className="bg-yellow-50 text-yellow-800">
                  <td className="py-3 px-4">3</td>
                  <td className="py-3 px-4">Warning row content</td>
                  <td className="py-3 px-4">Warning row content</td>
                  <td className="py-3 px-4">Warning row content</td>
                </tr>
                <tr className="bg-red-50 text-red-800">
                  <td className="py-3 px-4">4</td>
                  <td className="py-3 px-4">Danger row content</td>
                  <td className="py-3 px-4">Danger row content</td>
                  <td className="py-3 px-4">Danger row content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}
