"use client";

import React from "react";
import { MessageSquare, Image, Video, MapPin } from "lucide-react";

interface FeedItem {
  id: number;
  type: "text" | "image" | "video" | "location";
  author: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
}

const feedItems: FeedItem[] = [
  {
    id: 1,
    type: "text",
    author: "Kostya",
    avatar: "K",
    time: "1 min ago",
    content: "Hey! How is it going?",
  },
  {
    id: 2,
    type: "text",
    author: "Andrey",
    avatar: "A",
    time: "5 mins ago",
    content: "Just completed the new dashboard design. Check it out!",
  },
  {
    id: 3,
    type: "image",
    author: "Vlad",
    avatar: "V",
    time: "15 mins ago",
    content: "New office photos",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    type: "location",
    author: "Nasta",
    avatar: "N",
    time: "1 hour ago",
    content: "San Francisco, CA",
  },
  {
    id: 5,
    type: "text",
    author: "Nick",
    avatar: "N",
    time: "2 hours ago",
    content: "Meeting at 3pm today. Don't forget!",
  },
  {
    id: 6,
    type: "video",
    author: "Kate",
    avatar: "K",
    time: "3 hours ago",
    content: "Product demo video",
  },
];

const typeIcons = {
  text: MessageSquare,
  image: Image,
  video: Video,
  location: MapPin,
};

const avatarColors = ["#209e91", "#2dacd1", "#90b900", "#dfb81c", "#e85656"];

export function FeedWidget() {
  return (
    <div className="space-y-4">
      {feedItems.map((item, index) => {
        const Icon = typeIcons[item.type];
        const avatarColor = avatarColors[index % avatarColors.length];

        return (
          <div key={item.id} className="flex gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0"
              style={{ backgroundColor: avatarColor }}
            >
              {item.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-800">{item.author}</span>
                <Icon className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
              <p className="text-sm text-gray-600">{item.content}</p>
              {item.type === "image" && item.image && (
                <img
                  src={item.image}
                  alt={item.content}
                  className="mt-2 rounded-lg max-w-full h-auto"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
