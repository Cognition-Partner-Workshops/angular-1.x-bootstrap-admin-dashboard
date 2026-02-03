"use client";

import React, { useState, useEffect } from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";

interface ProgressBarProps {
  value: number;
  color?: string;
  striped?: boolean;
  animated?: boolean;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

function ProgressBar({
  value,
  color = "#209e91",
  striped = false,
  animated = false,
  showLabel = false,
  size = "md",
}: ProgressBarProps) {
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-4",
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${
          striped ? "bg-stripes" : ""
        } ${animated ? "animate-stripes" : ""}`}
        style={{
          width: `${value}%`,
          backgroundColor: color,
          backgroundImage: striped
            ? `linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)`
            : undefined,
          backgroundSize: striped ? "1rem 1rem" : undefined,
        }}
      >
        {showLabel && size === "lg" && (
          <span className="text-xs text-white font-medium px-2">{value}%</span>
        )}
      </div>
    </div>
  );
}

export default function ProgressPage() {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValue((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ContentTop title="Progress Bars" />

      <div className="space-y-6">
        <Panel title="Basic Progress Bars">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Default</span>
                <span className="text-sm text-gray-600">25%</span>
              </div>
              <ProgressBar value={25} />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Primary</span>
                <span className="text-sm text-gray-600">50%</span>
              </div>
              <ProgressBar value={50} color="#209e91" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Info</span>
                <span className="text-sm text-gray-600">75%</span>
              </div>
              <ProgressBar value={75} color="#2dacd1" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Success</span>
                <span className="text-sm text-gray-600">100%</span>
              </div>
              <ProgressBar value={100} color="#90b900" />
            </div>
          </div>
        </Panel>

        <Panel title="Colored Progress Bars">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Primary</span>
                <span className="text-sm text-gray-600">40%</span>
              </div>
              <ProgressBar value={40} color="#209e91" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Info</span>
                <span className="text-sm text-gray-600">55%</span>
              </div>
              <ProgressBar value={55} color="#2dacd1" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Success</span>
                <span className="text-sm text-gray-600">70%</span>
              </div>
              <ProgressBar value={70} color="#90b900" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Warning</span>
                <span className="text-sm text-gray-600">85%</span>
              </div>
              <ProgressBar value={85} color="#dfb81c" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Danger</span>
                <span className="text-sm text-gray-600">30%</span>
              </div>
              <ProgressBar value={30} color="#e85656" />
            </div>
          </div>
        </Panel>

        <Panel title="Progress Bar Sizes">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Small</span>
                <span className="text-sm text-gray-600">60%</span>
              </div>
              <ProgressBar value={60} size="sm" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Medium (Default)</span>
                <span className="text-sm text-gray-600">60%</span>
              </div>
              <ProgressBar value={60} size="md" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Large</span>
                <span className="text-sm text-gray-600">60%</span>
              </div>
              <ProgressBar value={60} size="lg" showLabel />
            </div>
          </div>
        </Panel>

        <Panel title="Striped Progress Bars">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Primary Striped</span>
                <span className="text-sm text-gray-600">45%</span>
              </div>
              <ProgressBar value={45} color="#209e91" striped />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Success Striped</span>
                <span className="text-sm text-gray-600">65%</span>
              </div>
              <ProgressBar value={65} color="#90b900" striped />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Warning Striped</span>
                <span className="text-sm text-gray-600">80%</span>
              </div>
              <ProgressBar value={80} color="#dfb81c" striped />
            </div>
          </div>
        </Panel>

        <Panel title="Animated Progress Bar">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Loading...</span>
                <span className="text-sm text-gray-600">{animatedValue}%</span>
              </div>
              <ProgressBar value={animatedValue} color="#209e91" />
            </div>
          </div>
        </Panel>

        <Panel title="Stacked Progress Bars">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Project Progress</p>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex">
                <div className="h-full bg-[#90b900]" style={{ width: "35%" }} />
                <div className="h-full bg-[#dfb81c]" style={{ width: "20%" }} />
                <div className="h-full bg-[#2dacd1]" style={{ width: "15%" }} />
              </div>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#90b900] rounded" />
                  Completed (35%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#dfb81c] rounded" />
                  In Progress (20%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-[#2dacd1] rounded" />
                  Review (15%)
                </span>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Progress with Labels">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">Storage Used</span>
                <span className="text-sm text-gray-500">7.5 GB of 10 GB</span>
              </div>
              <ProgressBar value={75} color="#209e91" size="lg" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">Bandwidth</span>
                <span className="text-sm text-gray-500">450 MB of 1 GB</span>
              </div>
              <ProgressBar value={45} color="#2dacd1" size="lg" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">CPU Usage</span>
                <span className="text-sm text-[#e85656]">92% - High</span>
              </div>
              <ProgressBar value={92} color="#e85656" size="lg" />
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
