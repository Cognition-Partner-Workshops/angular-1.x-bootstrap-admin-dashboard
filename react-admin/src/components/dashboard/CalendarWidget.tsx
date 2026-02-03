"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarEvent {
  date: number;
  title: string;
  color: string;
}

const events: CalendarEvent[] = [
  { date: 5, title: "Meeting", color: "#209e91" },
  { date: 12, title: "Conference", color: "#2dacd1" },
  { date: 18, title: "Deadline", color: "#e85656" },
  { date: 25, title: "Launch", color: "#90b900" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const getEventForDay = (day: number) => events.find((e) => e.date === day);

  const renderDays = () => {
    const days = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="p-2 text-center text-gray-300 text-sm">
          {daysInPrevMonth - i}
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const event = getEventForDay(day);
      days.push(
        <div
          key={day}
          className={`p-2 text-center text-sm relative cursor-pointer hover:bg-gray-50 rounded-lg transition-colors ${
            isToday(day) ? "bg-[#209e91] text-white hover:bg-[#1b867b]" : "text-gray-700"
          }`}
        >
          {day}
          {event && (
            <div
              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: event.color }}
              title={event.title}
            />
          )}
        </div>
      );
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <div key={`next-${i}`} className="p-2 text-center text-gray-300 text-sm">
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="font-medium text-gray-800">
          {MONTHS[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>

      <div className="mt-4 space-y-2">
        {events.map((event, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: event.color }}
            />
            <span className="text-gray-600">
              {MONTHS[month]} {event.date} - {event.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
