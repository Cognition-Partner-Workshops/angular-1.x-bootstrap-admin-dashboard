"use client";

import React, { useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";
import { Home, User, Settings, Bell, Mail } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  variant?: "default" | "pills" | "underline";
  vertical?: boolean;
}

function Tabs({ tabs, variant = "default", vertical = false }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  const getTabClasses = (isActive: boolean) => {
    const base = "px-4 py-2 font-medium transition-colors cursor-pointer";
    
    switch (variant) {
      case "pills":
        return `${base} rounded-lg ${
          isActive
            ? "bg-[#209e91] text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`;
      case "underline":
        return `${base} border-b-2 ${
          isActive
            ? "border-[#209e91] text-[#209e91]"
            : "border-transparent text-gray-600 hover:text-gray-800"
        }`;
      default:
        return `${base} border-b-2 ${
          isActive
            ? "border-[#209e91] text-[#209e91] bg-white"
            : "border-transparent text-gray-600 hover:bg-gray-50"
        }`;
    }
  };

  if (vertical) {
    return (
      <div className="flex gap-4">
        <div className="flex flex-col border-r border-gray-200 pr-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${getTabClasses(activeTab === tab.id)} text-left flex items-center gap-2`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex-1">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={`flex ${variant === "underline" ? "border-b border-gray-200" : "gap-1"}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${getTabClasses(activeTab === tab.id)} flex items-center gap-2`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

export default function TabsPage() {
  const basicTabs: Tab[] = [
    {
      id: "home",
      label: "Home",
      content: (
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Home Tab Content</h4>
          <p className="text-gray-600">
            This is the home tab content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      content: (
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Profile Tab Content</h4>
          <p className="text-gray-600">
            This is the profile tab content. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      ),
    },
    {
      id: "messages",
      label: "Messages",
      content: (
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Messages Tab Content</h4>
          <p className="text-gray-600">
            This is the messages tab content. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      ),
    },
  ];

  const iconTabs: Tab[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home className="w-4 h-4" />,
      content: (
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Home</h4>
          <p className="text-gray-600">Welcome to the home section of this tabbed interface.</p>
        </div>
      ),
    },
    {
      id: "user",
      label: "User",
      icon: <User className="w-4 h-4" />,
      content: (
        <div>
          <h4 className="font-medium text-gray-800 mb-2">User Profile</h4>
          <p className="text-gray-600">Manage your user profile settings here.</p>
        </div>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      content: (
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Settings</h4>
          <p className="text-gray-600">Configure your application settings.</p>
        </div>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
      content: (
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Notifications</h4>
          <p className="text-gray-600">View and manage your notifications.</p>
        </div>
      ),
    },
  ];

  const verticalTabs: Tab[] = [
    {
      id: "general",
      label: "General",
      icon: <Settings className="w-4 h-4" />,
      content: (
        <div>
          <h4 className="font-medium text-gray-800 mb-2">General Settings</h4>
          <p className="text-gray-600 mb-4">Configure general application settings.</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Enable notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Dark mode</span>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "account",
      label: "Account",
      icon: <User className="w-4 h-4" />,
      content: (
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Account Settings</h4>
          <p className="text-gray-600 mb-4">Manage your account information.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                defaultValue="user@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Username</label>
              <input
                type="text"
                defaultValue="johndoe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
      content: (
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Notification Preferences</h4>
          <p className="text-gray-600 mb-4">Choose how you want to be notified.</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Email notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Push notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">SMS notifications</span>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "messages",
      label: "Messages",
      icon: <Mail className="w-4 h-4" />,
      content: (
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Message Settings</h4>
          <p className="text-gray-600 mb-4">Configure your messaging preferences.</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Read receipts</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Typing indicators</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ContentTop title="Tabs" />

      <div className="space-y-6">
        <Panel title="Default Tabs">
          <Tabs tabs={basicTabs} />
        </Panel>

        <Panel title="Underline Tabs">
          <Tabs tabs={basicTabs} variant="underline" />
        </Panel>

        <Panel title="Pill Tabs">
          <Tabs tabs={basicTabs} variant="pills" />
        </Panel>

        <Panel title="Tabs with Icons">
          <Tabs tabs={iconTabs} variant="underline" />
        </Panel>

        <Panel title="Pill Tabs with Icons">
          <Tabs tabs={iconTabs} variant="pills" />
        </Panel>

        <Panel title="Vertical Tabs">
          <Tabs tabs={verticalTabs} vertical />
        </Panel>
      </div>
    </div>
  );
}
