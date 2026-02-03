"use client";

import React, { useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";
import { Eye, EyeOff, Calendar, Clock, Search } from "lucide-react";

export default function FormInputsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [switchValue, setSwitchValue] = useState(true);
  const [checkboxValues, setCheckboxValues] = useState({
    option1: true,
    option2: false,
    option3: true,
  });
  const [radioValue, setRadioValue] = useState("option1");
  const [selectValue, setSelectValue] = useState("");
  const [rangeValue, setRangeValue] = useState(50);

  return (
    <div>
      <ContentTop title="Form Inputs" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Standard Fields">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Input
              </label>
              <input
                type="text"
                placeholder="Enter text..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Input with Icon
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password Input
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password..."
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Disabled Input
              </label>
              <input
                type="text"
                placeholder="Disabled..."
                disabled
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Textarea
              </label>
              <textarea
                rows={4}
                placeholder="Enter your message..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent resize-none"
              />
            </div>
          </div>
        </Panel>

        <Panel title="Validation States">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Success State
              </label>
              <input
                type="text"
                defaultValue="Valid input"
                className="w-full px-3 py-2 border-2 border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-green-600">This field is valid!</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warning State
              </label>
              <input
                type="text"
                defaultValue="Warning input"
                className="w-full px-3 py-2 border-2 border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-yellow-600">Please check this field.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Error State
              </label>
              <input
                type="text"
                defaultValue="Invalid input"
                className="w-full px-3 py-2 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-red-600">This field has an error!</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Required Field *
              </label>
              <input
                type="text"
                placeholder="Required..."
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
              />
            </div>
          </div>
        </Panel>

        <Panel title="Checkboxes & Radios">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Checkboxes
              </label>
              <div className="space-y-2">
                {Object.entries(checkboxValues).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        setCheckboxValues({ ...checkboxValues, [key]: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-[#209e91] focus:ring-[#209e91]"
                    />
                    <span className="text-sm text-gray-700">
                      {key === "option1" ? "Primary Option" : key === "option2" ? "Secondary Option" : "Tertiary Option"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Radio Buttons
              </label>
              <div className="space-y-2">
                {["option1", "option2", "option3"].map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="radio-group"
                      value={option}
                      checked={radioValue === option}
                      onChange={(e) => setRadioValue(e.target.value)}
                      className="w-4 h-4 border-gray-300 text-[#209e91] focus:ring-[#209e91]"
                    />
                    <span className="text-sm text-gray-700">
                      {option === "option1" ? "First Choice" : option === "option2" ? "Second Choice" : "Third Choice"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Toggle Switch
              </label>
              <button
                onClick={() => setSwitchValue(!switchValue)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  switchValue ? "bg-[#209e91]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    switchValue ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </Panel>

        <Panel title="Select & Range">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Dropdown
              </label>
              <select
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent bg-white"
              >
                <option value="">Select an option...</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Multiple Select
              </label>
              <select
                multiple
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent bg-white h-32"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
                <option value="option5">Option 5</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Range Slider: {rangeValue}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={rangeValue}
                onChange={(e) => setRangeValue(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#209e91]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Input
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Input
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
