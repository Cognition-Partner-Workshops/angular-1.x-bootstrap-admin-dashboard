"use client";

import React from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";
import { MessageCircle, Image, MapPin, Video, FileText, CheckCircle, Star, Bell } from "lucide-react";

interface TimelineItem {
  id: number;
  type: "message" | "image" | "location" | "video" | "document" | "success" | "star" | "notification";
  title: string;
  description: string;
  time: string;
  user?: {
    name: string;
    avatar?: string;
  };
  image?: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: "message",
    title: "New message received",
    description: "John Doe sent you a message: 'Hey, can we schedule a meeting for tomorrow?'",
    time: "2 minutes ago",
    user: { name: "John Doe" },
  },
  {
    id: 2,
    type: "image",
    title: "Photo uploaded",
    description: "Sarah uploaded 3 new photos to the project gallery.",
    time: "15 minutes ago",
    user: { name: "Sarah Smith" },
  },
  {
    id: 3,
    type: "success",
    title: "Task completed",
    description: "The dashboard redesign task has been marked as complete.",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "location",
    title: "Location shared",
    description: "Mike shared his location: San Francisco, CA",
    time: "2 hours ago",
    user: { name: "Mike Johnson" },
  },
  {
    id: 5,
    type: "video",
    title: "Video call ended",
    description: "Team standup meeting lasted 45 minutes with 8 participants.",
    time: "3 hours ago",
  },
  {
    id: 6,
    type: "document",
    title: "Document shared",
    description: "Emily shared 'Q4 Report.pdf' with the team.",
    time: "5 hours ago",
    user: { name: "Emily Brown" },
  },
  {
    id: 7,
    type: "star",
    title: "Project starred",
    description: "Your project 'Admin Dashboard' was starred by 5 users.",
    time: "Yesterday",
  },
  {
    id: 8,
    type: "notification",
    title: "System notification",
    description: "Scheduled maintenance will occur on Sunday at 2:00 AM UTC.",
    time: "2 days ago",
  },
];

const getIcon = (type: TimelineItem["type"]) => {
  const iconMap = {
    message: { icon: MessageCircle, color: "bg-[#2dacd1]" },
    image: { icon: Image, color: "bg-[#90b900]" },
    location: { icon: MapPin, color: "bg-[#e85656]" },
    video: { icon: Video, color: "bg-[#dfb81c]" },
    document: { icon: FileText, color: "bg-[#209e91]" },
    success: { icon: CheckCircle, color: "bg-[#90b900]" },
    star: { icon: Star, color: "bg-[#dfb81c]" },
    notification: { icon: Bell, color: "bg-[#2dacd1]" },
  };
  return iconMap[type];
};

export default function TimelinePage() {
  return (
    <div>
      <ContentTop title="Timeline" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Activity Timeline">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-6">
              {timelineData.map((item) => {
                const { icon: Icon, color } = getIcon(item.type);
                return (
                  <div key={item.id} className="relative pl-10">
                    <div
                      className={`absolute left-0 w-8 h-8 rounded-full ${color} flex items-center justify-center`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-gray-800">{item.title}</h4>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      {item.user && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-6 h-6 bg-[#209e91] rounded-full flex items-center justify-center text-white text-xs">
                            {item.user.name.charAt(0)}
                          </div>
                          <span className="text-xs text-gray-500">{item.user.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Panel>

        <Panel title="Centered Timeline">
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
            <div className="space-y-8">
              {timelineData.slice(0, 6).map((item, index) => {
                const { icon: Icon, color } = getIcon(item.type);
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={item.id}
                    className={`relative flex ${isLeft ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`absolute left-1/2 top-4 w-4 h-4 rounded-full ${color} -translate-x-1/2 z-10 flex items-center justify-center`}
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div className={`w-5/12 ${isLeft ? "pr-8 text-right" : "pl-8 text-left"}`}>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center ${isLeft ? "order-last" : ""}`}>
                            <Icon className="w-3 h-3 text-white" />
                          </div>
                          <h4 className="font-medium text-gray-800 text-sm flex-1">{item.title}</h4>
                        </div>
                        <p className="text-xs text-gray-600">{item.description}</p>
                        <span className="text-xs text-gray-400 mt-2 block">{item.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Panel>

        <Panel title="Simple Timeline">
          <div className="space-y-4">
            {timelineData.slice(0, 5).map((item, index) => (
              <div
                key={item.id}
                className={`flex items-start gap-4 pb-4 ${
                  index < 4 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-[#209e91] mt-2" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-800 text-sm">{item.title}</h4>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Compact Timeline">
          <div className="relative pl-6">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-3">
              {timelineData.map((item) => {
                const { color } = getIcon(item.type);
                return (
                  <div key={item.id} className="relative">
                    <div
                      className={`absolute -left-4 w-3 h-3 rounded-full ${color} border-2 border-white`}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-800">{item.title}</span>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
