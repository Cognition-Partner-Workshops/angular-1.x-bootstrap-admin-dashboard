"use client";

import React from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";

export default function GridPage() {
  return (
    <div>
      <ContentTop title="Grid System" />

      <div className="space-y-6">
        <Panel title="Basic Grid">
          <p className="text-gray-600 mb-4">
            The grid system uses Tailwind CSS responsive classes. The grid is based on a 12-column layout.
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 bg-[#209e91] text-white p-4 rounded text-center">
                col-span-12
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6 bg-[#2dacd1] text-white p-4 rounded text-center">
                col-span-6
              </div>
              <div className="col-span-6 bg-[#2dacd1] text-white p-4 rounded text-center">
                col-span-6
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 bg-[#90b900] text-white p-4 rounded text-center">
                col-span-4
              </div>
              <div className="col-span-4 bg-[#90b900] text-white p-4 rounded text-center">
                col-span-4
              </div>
              <div className="col-span-4 bg-[#90b900] text-white p-4 rounded text-center">
                col-span-4
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 bg-[#dfb81c] text-white p-4 rounded text-center">
                col-span-3
              </div>
              <div className="col-span-3 bg-[#dfb81c] text-white p-4 rounded text-center">
                col-span-3
              </div>
              <div className="col-span-3 bg-[#dfb81c] text-white p-4 rounded text-center">
                col-span-3
              </div>
              <div className="col-span-3 bg-[#dfb81c] text-white p-4 rounded text-center">
                col-span-3
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-2 bg-[#e85656] text-white p-4 rounded text-center text-sm">
                col-2
              </div>
              <div className="col-span-2 bg-[#e85656] text-white p-4 rounded text-center text-sm">
                col-2
              </div>
              <div className="col-span-2 bg-[#e85656] text-white p-4 rounded text-center text-sm">
                col-2
              </div>
              <div className="col-span-2 bg-[#e85656] text-white p-4 rounded text-center text-sm">
                col-2
              </div>
              <div className="col-span-2 bg-[#e85656] text-white p-4 rounded text-center text-sm">
                col-2
              </div>
              <div className="col-span-2 bg-[#e85656] text-white p-4 rounded text-center text-sm">
                col-2
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Mixed Column Widths">
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8 bg-[#209e91] text-white p-4 rounded text-center">
                col-span-8
              </div>
              <div className="col-span-4 bg-[#2dacd1] text-white p-4 rounded text-center">
                col-span-4
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 bg-[#90b900] text-white p-4 rounded text-center">
                col-span-3
              </div>
              <div className="col-span-6 bg-[#dfb81c] text-white p-4 rounded text-center">
                col-span-6
              </div>
              <div className="col-span-3 bg-[#90b900] text-white p-4 rounded text-center">
                col-span-3
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-2 bg-[#e85656] text-white p-4 rounded text-center text-sm">
                col-2
              </div>
              <div className="col-span-7 bg-[#209e91] text-white p-4 rounded text-center">
                col-span-7
              </div>
              <div className="col-span-3 bg-[#2dacd1] text-white p-4 rounded text-center">
                col-span-3
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Responsive Grid">
          <p className="text-gray-600 mb-4">
            Resize the browser to see how the grid adapts to different screen sizes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div
                key={num}
                className="bg-[#209e91] text-white p-6 rounded text-center"
              >
                Item {num}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            1 column on mobile, 2 on sm, 3 on md, 4 on lg screens
          </p>
        </Panel>

        <Panel title="Grid with Gap Variations">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">gap-2 (8px)</p>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="bg-[#2dacd1] text-white p-4 rounded text-center">
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">gap-4 (16px)</p>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="bg-[#90b900] text-white p-4 rounded text-center">
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">gap-6 (24px)</p>
              <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="bg-[#dfb81c] text-white p-4 rounded text-center">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Nested Grid">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 bg-gray-100 p-4 rounded">
              <p className="text-gray-600 mb-2">col-span-8 (Parent)</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#209e91] text-white p-4 rounded text-center">
                  Nested 1
                </div>
                <div className="bg-[#209e91] text-white p-4 rounded text-center">
                  Nested 2
                </div>
                <div className="bg-[#209e91] text-white p-4 rounded text-center">
                  Nested 3
                </div>
                <div className="bg-[#209e91] text-white p-4 rounded text-center">
                  Nested 4
                </div>
              </div>
            </div>
            <div className="col-span-4 bg-[#2dacd1] text-white p-4 rounded">
              <p className="mb-2">col-span-4</p>
              <p className="text-sm opacity-80">
                This is a sidebar column that takes up 4 columns of the 12-column grid.
              </p>
            </div>
          </div>
        </Panel>

        <Panel title="Auto-fit Grid">
          <p className="text-gray-600 mb-4">
            Using CSS Grid auto-fit for flexible layouts that automatically adjust based on available space.
          </p>
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <div
                key={num}
                className="bg-[#209e91] text-white p-4 rounded text-center"
              >
                Item {num}
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Flexbox Layout">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">justify-start</p>
              <div className="flex justify-start gap-4">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="bg-[#209e91] text-white px-6 py-4 rounded">
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">justify-center</p>
              <div className="flex justify-center gap-4">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="bg-[#2dacd1] text-white px-6 py-4 rounded">
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">justify-end</p>
              <div className="flex justify-end gap-4">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="bg-[#90b900] text-white px-6 py-4 rounded">
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">justify-between</p>
              <div className="flex justify-between">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="bg-[#dfb81c] text-white px-6 py-4 rounded">
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">justify-around</p>
              <div className="flex justify-around">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="bg-[#e85656] text-white px-6 py-4 rounded">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
