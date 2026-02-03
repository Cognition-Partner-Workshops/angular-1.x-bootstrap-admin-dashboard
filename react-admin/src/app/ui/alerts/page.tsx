"use client";

import React, { useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

interface AlertProps {
  type: "success" | "info" | "warning" | "danger";
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

function Alert({ type, title, children, dismissible, onDismiss }: AlertProps) {
  const styles = {
    success: "bg-green-50 border-green-200 text-green-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    danger: "bg-red-50 border-red-200 text-red-800",
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    danger: <AlertCircle className="w-5 h-5 text-red-500" />,
  };

  return (
    <div className={`flex items-start gap-3 p-4 border rounded-lg ${styles[type]}`}>
      {icons[type]}
      <div className="flex-1">
        {title && <h4 className="font-medium mb-1">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>
      {dismissible && (
        <button onClick={onDismiss} className="p-1 hover:opacity-70 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState({
    success: true,
    info: true,
    warning: true,
    danger: true,
  });

  return (
    <div>
      <ContentTop title="Alerts" />

      <div className="space-y-6">
        <Panel title="Basic Alerts">
          <div className="space-y-4">
            <Alert type="success">
              <strong>Well done!</strong> You successfully read this important alert message.
            </Alert>
            <Alert type="info">
              <strong>Heads up!</strong> This alert needs your attention, but it is not super important.
            </Alert>
            <Alert type="warning">
              <strong>Warning!</strong> Better check yourself, you are not looking too good.
            </Alert>
            <Alert type="danger">
              <strong>Oh snap!</strong> Change a few things up and try submitting again.
            </Alert>
          </div>
        </Panel>

        <Panel title="Alerts with Titles">
          <div className="space-y-4">
            <Alert type="success" title="Success!">
              Your profile has been updated successfully.
            </Alert>
            <Alert type="info" title="Information">
              A new software update is available. See what is new in version 2.0.
            </Alert>
            <Alert type="warning" title="Warning">
              Your subscription is about to expire. Please renew to continue using our services.
            </Alert>
            <Alert type="danger" title="Error">
              Your account has been suspended. Please contact support for assistance.
            </Alert>
          </div>
        </Panel>

        <Panel title="Dismissible Alerts">
          <div className="space-y-4">
            {alerts.success && (
              <Alert
                type="success"
                dismissible
                onDismiss={() => setAlerts({ ...alerts, success: false })}
              >
                This is a dismissible success alert. Click the X to close it.
              </Alert>
            )}
            {alerts.info && (
              <Alert
                type="info"
                dismissible
                onDismiss={() => setAlerts({ ...alerts, info: false })}
              >
                This is a dismissible info alert. Click the X to close it.
              </Alert>
            )}
            {alerts.warning && (
              <Alert
                type="warning"
                dismissible
                onDismiss={() => setAlerts({ ...alerts, warning: false })}
              >
                This is a dismissible warning alert. Click the X to close it.
              </Alert>
            )}
            {alerts.danger && (
              <Alert
                type="danger"
                dismissible
                onDismiss={() => setAlerts({ ...alerts, danger: false })}
              >
                This is a dismissible danger alert. Click the X to close it.
              </Alert>
            )}
            {!alerts.success && !alerts.info && !alerts.warning && !alerts.danger && (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-4">All alerts have been dismissed.</p>
                <button
                  onClick={() => setAlerts({ success: true, info: true, warning: true, danger: true })}
                  className="px-4 py-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors"
                >
                  Reset Alerts
                </button>
              </div>
            )}
          </div>
        </Panel>

        <Panel title="Solid Alerts">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-[#90b900] text-white rounded-lg">
              <CheckCircle className="w-5 h-5" />
              <span>This is a solid success alert with white text.</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#2dacd1] text-white rounded-lg">
              <Info className="w-5 h-5" />
              <span>This is a solid info alert with white text.</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#dfb81c] text-white rounded-lg">
              <AlertTriangle className="w-5 h-5" />
              <span>This is a solid warning alert with white text.</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#e85656] text-white rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>This is a solid danger alert with white text.</span>
            </div>
          </div>
        </Panel>

        <Panel title="Alerts with Links">
          <div className="space-y-4">
            <Alert type="success">
              Your order has been placed! <a href="#" className="underline font-medium hover:opacity-80">View order details</a>
            </Alert>
            <Alert type="info">
              New features are available. <a href="#" className="underline font-medium hover:opacity-80">Learn more</a>
            </Alert>
            <Alert type="warning">
              Your trial ends in 3 days. <a href="#" className="underline font-medium hover:opacity-80">Upgrade now</a>
            </Alert>
            <Alert type="danger">
              Payment failed. <a href="#" className="underline font-medium hover:opacity-80">Update payment method</a>
            </Alert>
          </div>
        </Panel>

        <Panel title="Alerts with Additional Content">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h4 className="font-medium text-green-800">Order Confirmed</h4>
              </div>
              <p className="text-sm text-green-700 mb-3">
                Your order #12345 has been confirmed and will be shipped within 2-3 business days.
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                  Track Order
                </button>
                <button className="px-3 py-1 bg-white text-green-700 text-sm rounded border border-green-300 hover:bg-green-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h4 className="font-medium text-red-800">Action Required</h4>
              </div>
              <p className="text-sm text-red-700 mb-2">
                We detected unusual activity on your account. Please verify your identity to continue.
              </p>
              <ul className="text-sm text-red-700 list-disc list-inside mb-3">
                <li>Multiple failed login attempts detected</li>
                <li>Login from new device or location</li>
                <li>Password may have been compromised</li>
              </ul>
              <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                Verify Identity
              </button>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
