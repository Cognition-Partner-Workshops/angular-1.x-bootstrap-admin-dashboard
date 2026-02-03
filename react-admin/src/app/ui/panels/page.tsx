"use client";

import React from "react";
import { ContentTop } from "@/components/layout/ContentTop";
import { Settings, MoreVertical, X, Maximize2, Minimize2 } from "lucide-react";

interface PanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
  variant?: "default" | "primary" | "info" | "success" | "warning" | "danger";
}

function DemoPanel({ title, children, className = "", headerActions, variant = "default" }: PanelProps) {
  const variantStyles = {
    default: "bg-white",
    primary: "bg-[#209e91]",
    info: "bg-[#2dacd1]",
    success: "bg-[#90b900]",
    warning: "bg-[#dfb81c]",
    danger: "bg-[#e85656]",
  };

  const headerTextColor = variant === "default" ? "text-gray-800" : "text-white";

  return (
    <div className={`rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {title && (
        <div className={`px-4 py-3 flex items-center justify-between ${variantStyles[variant]}`}>
          <h3 className={`font-medium ${headerTextColor}`}>{title}</h3>
          {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
        </div>
      )}
      <div className="p-4 bg-white">{children}</div>
    </div>
  );
}

export default function PanelsPage() {
  return (
    <div>
      <ContentTop title="Panels" />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DemoPanel title="Default Panel">
            <p className="text-gray-600">
              This is a default panel with a white header. Panels are used to group related content
              and provide a consistent visual structure.
            </p>
          </DemoPanel>

          <DemoPanel title="Panel without Border" className="border-0 shadow-md">
            <p className="text-gray-600">
              This panel has no border but uses a shadow for depth. It provides a cleaner look
              while still maintaining visual separation.
            </p>
          </DemoPanel>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mt-8 mb-4">Colored Panels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DemoPanel title="Primary Panel" variant="primary">
            <p className="text-gray-600">
              A panel with a primary colored header. Use this for important or highlighted content.
            </p>
          </DemoPanel>

          <DemoPanel title="Info Panel" variant="info">
            <p className="text-gray-600">
              A panel with an info colored header. Use this for informational content.
            </p>
          </DemoPanel>

          <DemoPanel title="Success Panel" variant="success">
            <p className="text-gray-600">
              A panel with a success colored header. Use this for positive or completed content.
            </p>
          </DemoPanel>

          <DemoPanel title="Warning Panel" variant="warning">
            <p className="text-gray-600">
              A panel with a warning colored header. Use this for cautionary content.
            </p>
          </DemoPanel>

          <DemoPanel title="Danger Panel" variant="danger">
            <p className="text-gray-600">
              A panel with a danger colored header. Use this for critical or error content.
            </p>
          </DemoPanel>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mt-8 mb-4">Panels with Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DemoPanel
            title="Panel with Settings"
            headerActions={
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <Settings className="w-4 h-4 text-gray-500" />
              </button>
            }
          >
            <p className="text-gray-600">
              This panel has a settings icon in the header that can be used to open configuration options.
            </p>
          </DemoPanel>

          <DemoPanel
            title="Panel with Menu"
            headerActions={
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
            }
          >
            <p className="text-gray-600">
              This panel has a menu icon that can be used to show additional actions in a dropdown.
            </p>
          </DemoPanel>

          <DemoPanel
            title="Panel with Multiple Actions"
            headerActions={
              <>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <Minimize2 className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <Maximize2 className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </>
            }
          >
            <p className="text-gray-600">
              This panel has multiple action icons: minimize, maximize, and close buttons.
            </p>
          </DemoPanel>

          <DemoPanel
            title="Primary Panel with Actions"
            variant="primary"
            headerActions={
              <>
                <button className="p-1 hover:bg-white/20 rounded transition-colors">
                  <Settings className="w-4 h-4 text-white" />
                </button>
                <button className="p-1 hover:bg-white/20 rounded transition-colors">
                  <X className="w-4 h-4 text-white" />
                </button>
              </>
            }
          >
            <p className="text-gray-600">
              Colored panels can also have action buttons with appropriate icon colors.
            </p>
          </DemoPanel>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mt-8 mb-4">Panel Variations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DemoPanel title="Panel with Scrollable Content" className="max-h-64">
            <div className="h-48 overflow-y-auto">
              <p className="text-gray-600 mb-4">
                This panel has a fixed height with scrollable content. Useful for displaying lists or
                large amounts of content in a constrained space.
              </p>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-gray-600 mb-4">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <p className="text-gray-600 mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
              <p className="text-gray-600">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
          </DemoPanel>

          <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-white border-b border-gray-200">
              <h3 className="font-medium text-gray-800">Panel with Footer</h3>
            </div>
            <div className="p-4 bg-white">
              <p className="text-gray-600">
                This panel includes a footer section that can be used for actions or additional
                information.
              </p>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
                Cancel
              </button>
              <button className="px-3 py-1 bg-[#209e91] text-white rounded hover:bg-[#1b867b] transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mt-8 mb-4">Nested Panels</h3>
        <DemoPanel title="Parent Panel">
          <p className="text-gray-600 mb-4">
            Panels can be nested inside other panels to create hierarchical content structures.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DemoPanel title="Nested Panel 1" variant="info">
              <p className="text-gray-600 text-sm">Content for the first nested panel.</p>
            </DemoPanel>
            <DemoPanel title="Nested Panel 2" variant="success">
              <p className="text-gray-600 text-sm">Content for the second nested panel.</p>
            </DemoPanel>
          </div>
        </DemoPanel>
      </div>
    </div>
  );
}
