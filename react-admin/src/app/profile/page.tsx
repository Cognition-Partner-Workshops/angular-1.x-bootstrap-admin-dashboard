"use client";

import React, { useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Edit2,
  Camera,
  Facebook,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";

const userProfile = {
  name: "John Doe",
  title: "Senior Software Engineer",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  joinDate: "January 2022",
  department: "Engineering",
  bio: "Passionate software engineer with 8+ years of experience in building scalable web applications. Specialized in React, TypeScript, and Node.js. Love contributing to open source projects and mentoring junior developers.",
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL", "PostgreSQL"],
  social: {
    facebook: "johndoe",
    twitter: "johndoe",
    linkedin: "johndoe",
    github: "johndoe",
  },
};

const recentActivity = [
  { id: 1, action: "Completed task", description: "Dashboard redesign", time: "2 hours ago" },
  { id: 2, action: "Commented on", description: "PR #42 - Fix navigation bug", time: "5 hours ago" },
  { id: 3, action: "Merged", description: "Feature branch into main", time: "Yesterday" },
  { id: 4, action: "Created", description: "New project repository", time: "2 days ago" },
  { id: 5, action: "Updated", description: "Profile information", time: "1 week ago" },
];

const stats = [
  { label: "Projects", value: 24 },
  { label: "Tasks", value: 156 },
  { label: "Reviews", value: 89 },
  { label: "Commits", value: 1247 },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <ContentTop title="Profile" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Panel>
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-[#209e91] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto">
                  JD
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mt-4">{userProfile.name}</h2>
              <p className="text-gray-500">{userProfile.title}</p>

              <div className="flex justify-center gap-3 mt-4">
                <a
                  href="#"
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-900 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-4 h-4 text-[#209e91]" />
                <span className="text-sm">{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4 text-[#209e91]" />
                <span className="text-sm">{userProfile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-4 h-4 text-[#209e91]" />
                <span className="text-sm">{userProfile.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-4 h-4 text-[#209e91]" />
                <span className="text-sm">Joined {userProfile.joinDate}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Briefcase className="w-4 h-4 text-[#209e91]" />
                <span className="text-sm">{userProfile.department}</span>
              </div>
            </div>
          </Panel>

          <Panel title="Statistics">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#209e91]">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Panel
            title="About Me"
            className="relative"
          >
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4 text-gray-500" />
            </button>
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  defaultValue={userProfile.bio}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent resize-none"
                  rows={4}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">{userProfile.bio}</p>
            )}
          </Panel>

          <Panel title="Skills">
            <div className="flex flex-wrap gap-2">
              {userProfile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-[#209e91]/10 text-[#209e91] rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Panel>

          <Panel title="Recent Activity">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start gap-4 pb-4 ${
                    index < recentActivity.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-[#209e91] mt-2" />
                  <div className="flex-1">
                    <p className="text-gray-800">
                      <span className="font-medium">{activity.action}</span>{" "}
                      <span className="text-gray-600">{activity.description}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Edit Profile">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={userProfile.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  defaultValue={userProfile.phone}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  defaultValue={userProfile.location}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  defaultValue={userProfile.title}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#209e91] text-white rounded-lg hover:bg-[#1b867b] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </Panel>
        </div>
      </div>
    </div>
  );
}
