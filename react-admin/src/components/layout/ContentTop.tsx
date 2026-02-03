"use client";

import React from "react";

interface ContentTopProps {
  title: string;
}

export function ContentTop({ title }: ContentTopProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-light text-gray-800">{title}</h1>
    </div>
  );
}
