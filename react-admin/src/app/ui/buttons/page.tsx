"use client";

import React from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";
import { Download, Upload, Settings, Trash2, Plus, Check, X, ArrowRight } from "lucide-react";

export default function ButtonsPage() {
  return (
    <div>
      <ContentTop title="Buttons" />

      <div className="space-y-6">
        <Panel title="Default Buttons">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors">
              Primary
            </button>
            <button className="px-4 py-2 bg-[#2dacd1] text-white rounded-lg hover:bg-[#2692b2] transition-colors">
              Info
            </button>
            <button className="px-4 py-2 bg-[#90b900] text-white rounded-lg hover:bg-[#7a9d00] transition-colors">
              Success
            </button>
            <button className="px-4 py-2 bg-[#dfb81c] text-white rounded-lg hover:bg-[#bd9c18] transition-colors">
              Warning
            </button>
            <button className="px-4 py-2 bg-[#e85656] text-white rounded-lg hover:bg-[#c54949] transition-colors">
              Danger
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Default
            </button>
          </div>
        </Panel>

        <Panel title="Outline Buttons">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 border-2 border-[#209e91] text-[#209e91] rounded-lg hover:bg-[#209e91] hover:text-white transition-colors">
              Primary
            </button>
            <button className="px-4 py-2 border-2 border-[#2dacd1] text-[#2dacd1] rounded-lg hover:bg-[#2dacd1] hover:text-white transition-colors">
              Info
            </button>
            <button className="px-4 py-2 border-2 border-[#90b900] text-[#90b900] rounded-lg hover:bg-[#90b900] hover:text-white transition-colors">
              Success
            </button>
            <button className="px-4 py-2 border-2 border-[#dfb81c] text-[#dfb81c] rounded-lg hover:bg-[#dfb81c] hover:text-white transition-colors">
              Warning
            </button>
            <button className="px-4 py-2 border-2 border-[#e85656] text-[#e85656] rounded-lg hover:bg-[#e85656] hover:text-white transition-colors">
              Danger
            </button>
          </div>
        </Panel>

        <Panel title="Button Sizes">
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-6 py-3 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors text-lg">
              Large
            </button>
            <button className="px-4 py-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors">
              Default
            </button>
            <button className="px-3 py-1.5 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors text-sm">
              Small
            </button>
            <button className="px-2 py-1 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors text-xs">
              Extra Small
            </button>
          </div>
        </Panel>

        <Panel title="Buttons with Icons">
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#2dacd1] text-white rounded-lg hover:bg-[#2692b2] transition-colors">
              <Upload className="w-4 h-4" />
              Upload
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#90b900] text-white rounded-lg hover:bg-[#7a9d00] transition-colors">
              <Check className="w-4 h-4" />
              Confirm
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#e85656] text-white rounded-lg hover:bg-[#c54949] transition-colors">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </Panel>

        <Panel title="Icon Only Buttons">
          <div className="flex flex-wrap gap-3">
            <button className="p-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            <button className="p-2 bg-[#2dacd1] text-white rounded-lg hover:bg-[#2692b2] transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 bg-[#90b900] text-white rounded-lg hover:bg-[#7a9d00] transition-colors">
              <Check className="w-5 h-5" />
            </button>
            <button className="p-2 bg-[#e85656] text-white rounded-lg hover:bg-[#c54949] transition-colors">
              <X className="w-5 h-5" />
            </button>
            <button className="p-2 border-2 border-[#209e91] text-[#209e91] rounded-lg hover:bg-[#209e91] hover:text-white transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </Panel>

        <Panel title="Rounded Buttons">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-[#209e91] text-white rounded-full hover:bg-[#1b867b] transition-colors">
              Primary
            </button>
            <button className="px-4 py-2 bg-[#2dacd1] text-white rounded-full hover:bg-[#2692b2] transition-colors">
              Info
            </button>
            <button className="px-4 py-2 bg-[#90b900] text-white rounded-full hover:bg-[#7a9d00] transition-colors">
              Success
            </button>
            <button className="px-4 py-2 border-2 border-[#dfb81c] text-[#dfb81c] rounded-full hover:bg-[#dfb81c] hover:text-white transition-colors">
              Warning
            </button>
            <button className="px-4 py-2 border-2 border-[#e85656] text-[#e85656] rounded-full hover:bg-[#e85656] hover:text-white transition-colors">
              Danger
            </button>
          </div>
        </Panel>

        <Panel title="Button Groups">
          <div className="space-y-4">
            <div className="inline-flex rounded-lg overflow-hidden">
              <button className="px-4 py-2 bg-[#209e91] text-white hover:bg-[#1b867b] transition-colors border-r border-[#1b867b]">
                Left
              </button>
              <button className="px-4 py-2 bg-[#209e91] text-white hover:bg-[#1b867b] transition-colors border-r border-[#1b867b]">
                Middle
              </button>
              <button className="px-4 py-2 bg-[#209e91] text-white hover:bg-[#1b867b] transition-colors">
                Right
              </button>
            </div>

            <div className="inline-flex rounded-lg overflow-hidden">
              <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                1
              </button>
              <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                3
              </button>
            </div>
          </div>
        </Panel>

        <Panel title="Disabled Buttons">
          <div className="flex flex-wrap gap-3">
            <button
              disabled
              className="px-4 py-2 bg-[#209e91] text-white rounded-lg opacity-50 cursor-not-allowed"
            >
              Primary
            </button>
            <button
              disabled
              className="px-4 py-2 bg-[#2dacd1] text-white rounded-lg opacity-50 cursor-not-allowed"
            >
              Info
            </button>
            <button
              disabled
              className="px-4 py-2 border-2 border-[#90b900] text-[#90b900] rounded-lg opacity-50 cursor-not-allowed"
            >
              Success
            </button>
          </div>
        </Panel>

        <Panel title="Block Buttons">
          <div className="space-y-3 max-w-md">
            <button className="w-full px-4 py-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors">
              Block Primary Button
            </button>
            <button className="w-full px-4 py-2 bg-[#2dacd1] text-white rounded-lg hover:bg-[#2692b2] transition-colors">
              Block Info Button
            </button>
            <button className="w-full px-4 py-2 border-2 border-[#90b900] text-[#90b900] rounded-lg hover:bg-[#90b900] hover:text-white transition-colors">
              Block Success Outline
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
