"use client";

import React, { useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-auto`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default function ModalsPage() {
  const [basicModal, setBasicModal] = useState(false);
  const [smallModal, setSmallModal] = useState(false);
  const [largeModal, setLargeModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [dangerModal, setDangerModal] = useState(false);
  const [formModal, setFormModal] = useState(false);

  return (
    <div>
      <ContentTop title="Modals" />

      <div className="space-y-6">
        <Panel title="Basic Modals">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setBasicModal(true)}
              className="px-4 py-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors"
            >
              Basic Modal
            </button>
            <button
              onClick={() => setSmallModal(true)}
              className="px-4 py-2 bg-[#2dacd1] text-white rounded-lg hover:bg-[#2692b2] transition-colors"
            >
              Small Modal
            </button>
            <button
              onClick={() => setLargeModal(true)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Large Modal
            </button>
          </div>
        </Panel>

        <Panel title="Alert Modals">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSuccessModal(true)}
              className="px-4 py-2 bg-[#90b900] text-white rounded-lg hover:bg-[#7a9d00] transition-colors"
            >
              Success Modal
            </button>
            <button
              onClick={() => setWarningModal(true)}
              className="px-4 py-2 bg-[#dfb81c] text-white rounded-lg hover:bg-[#bd9c18] transition-colors"
            >
              Warning Modal
            </button>
            <button
              onClick={() => setDangerModal(true)}
              className="px-4 py-2 bg-[#e85656] text-white rounded-lg hover:bg-[#c54949] transition-colors"
            >
              Danger Modal
            </button>
          </div>
        </Panel>

        <Panel title="Form Modal">
          <button
            onClick={() => setFormModal(true)}
            className="px-4 py-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors"
          >
            Open Form Modal
          </button>
        </Panel>
      </div>

      <Modal isOpen={basicModal} onClose={() => setBasicModal(false)} title="Basic Modal">
        <p className="text-gray-600 mb-4">
          This is a basic modal dialog. You can put any content here including text, images, forms, or other components.
        </p>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setBasicModal(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => setBasicModal(false)}
            className="px-4 py-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </Modal>

      <Modal isOpen={smallModal} onClose={() => setSmallModal(false)} title="Small Modal" size="sm">
        <p className="text-gray-600 mb-4">This is a small modal with limited width.</p>
        <div className="flex justify-end">
          <button
            onClick={() => setSmallModal(false)}
            className="px-4 py-2 bg-[#2dacd1] text-white rounded-lg hover:bg-[#2692b2] transition-colors"
          >
            Got it
          </button>
        </div>
      </Modal>

      <Modal isOpen={largeModal} onClose={() => setLargeModal(false)} title="Large Modal" size="lg">
        <p className="text-gray-600 mb-4">
          This is a large modal with more space for content. It is useful for displaying detailed information, large forms, or complex content.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Section 1</h4>
            <p className="text-sm text-gray-600">Content for section 1 goes here.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Section 2</h4>
            <p className="text-sm text-gray-600">Content for section 2 goes here.</p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setLargeModal(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setLargeModal(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Confirm
          </button>
        </div>
      </Modal>

      <Modal isOpen={successModal} onClose={() => setSuccessModal(false)} title="Success" size="sm">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-[#90b900] mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Your action was completed successfully!</p>
          <button
            onClick={() => setSuccessModal(false)}
            className="px-6 py-2 bg-[#90b900] text-white rounded-lg hover:bg-[#7a9d00] transition-colors"
          >
            OK
          </button>
        </div>
      </Modal>

      <Modal isOpen={warningModal} onClose={() => setWarningModal(false)} title="Warning" size="sm">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-[#dfb81c] mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Are you sure you want to proceed? This action may have consequences.</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setWarningModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setWarningModal(false)}
              className="px-4 py-2 bg-[#dfb81c] text-white rounded-lg hover:bg-[#bd9c18] transition-colors"
            >
              Proceed
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={dangerModal} onClose={() => setDangerModal(false)} title="Delete Confirmation" size="sm">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-[#e85656] mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Are you sure you want to delete this item? This action cannot be undone.</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setDangerModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setDangerModal(false)}
              className="px-4 py-2 bg-[#e85656] text-white rounded-lg hover:bg-[#c54949] transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={formModal} onClose={() => setFormModal(false)} title="Contact Form">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows={4}
              placeholder="Enter your message"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent resize-none"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setFormModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setFormModal(false);
              }}
              className="px-4 py-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
