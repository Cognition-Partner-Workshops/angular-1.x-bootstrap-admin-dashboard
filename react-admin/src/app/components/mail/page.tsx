"use client";

import React, { useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";
import {
  Inbox,
  Send,
  Star,
  Trash2,
  Archive,
  Tag,
  Search,
  MoreVertical,
  Paperclip,
  Reply,
  Forward,
  ChevronLeft,
} from "lucide-react";

interface Email {
  id: number;
  from: string;
  email: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
  hasAttachment: boolean;
  labels: string[];
}

const emails: Email[] = [
  {
    id: 1,
    from: "John Doe",
    email: "john.doe@example.com",
    subject: "Project Update - Q4 Review",
    preview: "Hi team, I wanted to share the latest updates on our Q4 project...",
    body: "Hi team,\n\nI wanted to share the latest updates on our Q4 project. We've made significant progress on the dashboard redesign and the new features are ready for testing.\n\nKey highlights:\n- Dashboard redesign completed\n- New analytics module integrated\n- Performance improvements of 40%\n\nPlease review and let me know your thoughts.\n\nBest regards,\nJohn",
    date: "10:30 AM",
    read: false,
    starred: true,
    hasAttachment: true,
    labels: ["work"],
  },
  {
    id: 2,
    from: "Sarah Smith",
    email: "sarah.smith@example.com",
    subject: "Meeting Tomorrow",
    preview: "Don't forget about our meeting tomorrow at 2 PM...",
    body: "Hi,\n\nDon't forget about our meeting tomorrow at 2 PM. We'll be discussing the new marketing strategy and budget allocation for next quarter.\n\nPlease come prepared with your department's requirements.\n\nThanks,\nSarah",
    date: "9:15 AM",
    read: true,
    starred: false,
    hasAttachment: false,
    labels: ["meeting"],
  },
  {
    id: 3,
    from: "GitHub",
    email: "noreply@github.com",
    subject: "[admin-dashboard] Pull request merged",
    preview: "Your pull request #42 has been merged into main...",
    body: "Your pull request #42 has been merged into main.\n\nChanges:\n- Fixed sidebar navigation bug\n- Updated dependencies\n- Added new chart components\n\nView the changes: https://github.com/example/admin-dashboard/pull/42",
    date: "Yesterday",
    read: true,
    starred: false,
    hasAttachment: false,
    labels: ["github"],
  },
  {
    id: 4,
    from: "Mike Johnson",
    email: "mike.j@example.com",
    subject: "Design Review Feedback",
    preview: "I've reviewed the latest designs and have some feedback...",
    body: "Hi,\n\nI've reviewed the latest designs and have some feedback:\n\n1. The color scheme looks great\n2. Consider adding more whitespace in the header\n3. The mobile layout needs some adjustments\n\nOverall, great work! Let's discuss in our next sync.\n\nMike",
    date: "Yesterday",
    read: false,
    starred: true,
    hasAttachment: true,
    labels: ["design"],
  },
  {
    id: 5,
    from: "Newsletter",
    email: "newsletter@techweekly.com",
    subject: "This Week in Tech - AI Updates",
    preview: "The latest news in artificial intelligence and machine learning...",
    body: "This Week in Tech\n\nTop Stories:\n\n1. New AI model achieves breakthrough in natural language processing\n2. Major tech companies announce collaboration on AI safety\n3. Open source AI tools gaining popularity\n\nRead more at techweekly.com",
    date: "2 days ago",
    read: true,
    starred: false,
    hasAttachment: false,
    labels: ["newsletter"],
  },
  {
    id: 6,
    from: "Emily Brown",
    email: "emily.b@example.com",
    subject: "Invoice #1234",
    preview: "Please find attached the invoice for last month's services...",
    body: "Hi,\n\nPlease find attached the invoice for last month's services.\n\nInvoice Details:\n- Invoice #: 1234\n- Amount: $2,500.00\n- Due Date: February 15, 2024\n\nPayment can be made via bank transfer or credit card.\n\nThank you for your business!\n\nEmily",
    date: "3 days ago",
    read: true,
    starred: false,
    hasAttachment: true,
    labels: ["finance"],
  },
];

const folders = [
  { id: "inbox", name: "Inbox", icon: Inbox, count: 12 },
  { id: "sent", name: "Sent", icon: Send, count: 0 },
  { id: "starred", name: "Starred", icon: Star, count: 2 },
  { id: "archive", name: "Archive", icon: Archive, count: 0 },
  { id: "trash", name: "Trash", icon: Trash2, count: 0 },
];

const labels = [
  { id: "work", name: "Work", color: "#209e91" },
  { id: "meeting", name: "Meeting", color: "#2dacd1" },
  { id: "design", name: "Design", color: "#90b900" },
  { id: "finance", name: "Finance", color: "#dfb81c" },
  { id: "github", name: "GitHub", color: "#e85656" },
];

export default function MailPage() {
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmails = emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.from.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <ContentTop title="Mail" />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <Panel>
            <button className="w-full px-4 py-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors mb-4">
              Compose
            </button>

            <div className="space-y-1">
              {folders.map((folder) => {
                const Icon = folder.icon;
                return (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      selectedFolder === folder.id
                        ? "bg-[#209e91] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{folder.name}</span>
                    </div>
                    {folder.count > 0 && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          selectedFolder === folder.id
                            ? "bg-white/20"
                            : "bg-gray-200"
                        }`}
                      >
                        {folder.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Labels
              </h4>
              <div className="space-y-1">
                {labels.map((label) => (
                  <button
                    key={label.id}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: label.color }}
                    />
                    <span>{label.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </Panel>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <Panel>
            {selectedEmail ? (
              <div>
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                  <button
                    onClick={() => setSelectedEmail(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{selectedEmail.subject}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Reply className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Forward className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="py-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#209e91] rounded-full flex items-center justify-center text-white font-medium">
                      {selectedEmail.from.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-800">{selectedEmail.from}</span>
                          <span className="text-sm text-gray-500 ml-2">&lt;{selectedEmail.email}&gt;</span>
                        </div>
                        <span className="text-sm text-gray-500">{selectedEmail.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {selectedEmail.labels.map((label) => {
                          const labelData = labels.find((l) => l.id === label);
                          return (
                            <span
                              key={label}
                              className="text-xs px-2 py-0.5 rounded-full text-white"
                              style={{ backgroundColor: labelData?.color }}
                            >
                              {labelData?.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-gray-700 whitespace-pre-line">
                    {selectedEmail.body}
                  </div>

                  {selectedEmail.hasAttachment && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Attachments</h4>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg w-fit">
                        <Paperclip className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">document.pdf</span>
                        <span className="text-xs text-gray-500">(2.4 MB)</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <textarea
                    placeholder="Write a reply..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent resize-none"
                    rows={4}
                  />
                  <div className="flex justify-end mt-3">
                    <button className="px-4 py-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors">
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search emails..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {filteredEmails.map((email) => (
                    <div
                      key={email.id}
                      onClick={() => setSelectedEmail(email)}
                      className={`flex items-start gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        !email.read ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className={`${
                            email.starred ? "text-[#dfb81c]" : "text-gray-300 hover:text-gray-400"
                          }`}
                        >
                          <Star className="w-4 h-4" fill={email.starred ? "currentColor" : "none"} />
                        </button>
                        <div className="w-8 h-8 bg-[#209e91] rounded-full flex items-center justify-center text-white text-sm">
                          {email.from.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`${!email.read ? "font-semibold" : ""} text-gray-800`}>
                            {email.from}
                          </span>
                          <span className="text-xs text-gray-500">{email.date}</span>
                        </div>
                        <div className={`${!email.read ? "font-medium" : ""} text-gray-800 text-sm truncate`}>
                          {email.subject}
                        </div>
                        <div className="text-sm text-gray-500 truncate">{email.preview}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {email.hasAttachment && (
                            <Paperclip className="w-3 h-3 text-gray-400" />
                          )}
                          {email.labels.map((label) => {
                            const labelData = labels.find((l) => l.id === label);
                            return (
                              <span
                                key={label}
                                className="text-xs px-1.5 py-0.5 rounded text-white"
                                style={{ backgroundColor: labelData?.color }}
                              >
                                {labelData?.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}
