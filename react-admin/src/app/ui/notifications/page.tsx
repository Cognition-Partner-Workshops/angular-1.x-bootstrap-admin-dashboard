"use client";

import React, { useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

interface ToastProps {
  type: "success" | "info" | "warning" | "danger";
  title: string;
  message: string;
  onClose: () => void;
}

function Toast({ type, title, message, onClose }: ToastProps) {
  const styles = {
    success: "border-l-4 border-[#90b900]",
    info: "border-l-4 border-[#2dacd1]",
    warning: "border-l-4 border-[#dfb81c]",
    danger: "border-l-4 border-[#e85656]",
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[#90b900]" />,
    info: <Info className="w-5 h-5 text-[#2dacd1]" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#dfb81c]" />,
    danger: <AlertCircle className="w-5 h-5 text-[#e85656]" />,
  };

  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 flex items-start gap-3 ${styles[type]}`}>
      {icons[type]}
      <div className="flex-1">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface Notification {
  id: number;
  type: "success" | "info" | "warning" | "danger";
  title: string;
  message: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [nextId, setNextId] = useState(1);

  const addNotification = (type: Notification["type"], title: string, message: string) => {
    const newNotification: Notification = {
      id: nextId,
      type,
      title,
      message,
    };
    setNotifications((prev) => [...prev, newNotification]);
    setNextId((prev) => prev + 1);

    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div>
      <ContentTop title="Notifications" />

      <div className="fixed top-20 right-4 z-50 space-y-2 w-80">
        {notifications.map((notification) => (
          <Toast
            key={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>

      <div className="space-y-6">
        <Panel title="Toast Notifications">
          <p className="text-gray-600 mb-4">
            Click the buttons below to trigger toast notifications. They will automatically dismiss after 5 seconds.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() =>
                addNotification("success", "Success!", "Your action was completed successfully.")
              }
              className="px-4 py-2 bg-[#90b900] text-white rounded-lg hover:bg-[#7a9d00] transition-colors"
            >
              Success Toast
            </button>
            <button
              onClick={() =>
                addNotification("info", "Information", "Here is some useful information for you.")
              }
              className="px-4 py-2 bg-[#2dacd1] text-white rounded-lg hover:bg-[#2692b2] transition-colors"
            >
              Info Toast
            </button>
            <button
              onClick={() =>
                addNotification("warning", "Warning", "Please review this before proceeding.")
              }
              className="px-4 py-2 bg-[#dfb81c] text-white rounded-lg hover:bg-[#bd9c18] transition-colors"
            >
              Warning Toast
            </button>
            <button
              onClick={() =>
                addNotification("danger", "Error", "Something went wrong. Please try again.")
              }
              className="px-4 py-2 bg-[#e85656] text-white rounded-lg hover:bg-[#c54949] transition-colors"
            >
              Danger Toast
            </button>
          </div>
        </Panel>

        <Panel title="Static Toast Examples">
          <div className="space-y-4 max-w-md">
            <div className="bg-white shadow-lg rounded-lg p-4 flex items-start gap-3 border-l-4 border-[#90b900]">
              <CheckCircle className="w-5 h-5 text-[#90b900]" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">Success</h4>
                <p className="text-sm text-gray-600">Your profile has been updated.</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 flex items-start gap-3 border-l-4 border-[#2dacd1]">
              <Info className="w-5 h-5 text-[#2dacd1]" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">Information</h4>
                <p className="text-sm text-gray-600">A new version is available.</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 flex items-start gap-3 border-l-4 border-[#dfb81c]">
              <AlertTriangle className="w-5 h-5 text-[#dfb81c]" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">Warning</h4>
                <p className="text-sm text-gray-600">Your subscription expires soon.</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 flex items-start gap-3 border-l-4 border-[#e85656]">
              <AlertCircle className="w-5 h-5 text-[#e85656]" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">Error</h4>
                <p className="text-sm text-gray-600">Failed to save changes.</p>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Inline Notifications">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800">Your changes have been saved successfully.</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Info className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800">This feature is currently in beta.</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800">Please verify your email address.</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">Unable to connect to the server.</span>
            </div>
          </div>
        </Panel>

        <Panel title="Banner Notifications">
          <div className="space-y-4">
            <div className="p-4 bg-[#209e91] text-white rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5" />
                <span>New features are now available! Check out what is new in this release.</span>
              </div>
              <button className="px-3 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors">
                Learn More
              </button>
            </div>
            <div className="p-4 bg-[#e85656] text-white rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                <span>Scheduled maintenance on Sunday, 2:00 AM - 4:00 AM UTC.</span>
              </div>
              <button className="px-3 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        </Panel>

        <Panel title="Notification with Actions">
          <div className="space-y-4 max-w-lg">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#209e91] rounded-full flex items-center justify-center text-white font-medium">
                    JD
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">John Doe sent you a message</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Hey, I wanted to follow up on our discussion from yesterday...
                    </p>
                    <p className="text-xs text-gray-400 mt-2">2 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex gap-2">
                <button className="px-3 py-1 bg-[#209e91] text-white text-sm rounded hover:bg-[#1b867b] transition-colors">
                  Reply
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors">
                  Mark as Read
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#90b900] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">Task Completed</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Your export has finished processing and is ready for download.
                    </p>
                    <p className="text-xs text-gray-400 mt-2">5 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex gap-2">
                <button className="px-3 py-1 bg-[#209e91] text-white text-sm rounded hover:bg-[#1b867b] transition-colors">
                  Download
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
