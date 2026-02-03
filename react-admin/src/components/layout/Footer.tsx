"use client";

import React from "react";
import { Facebook, Twitter, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/sidebar-context";

export function Footer() {
  const { isCollapsed } = useSidebar();

  return (
    <footer
      className={cn(
        "fixed bottom-0 right-0 h-12 bg-white border-t flex items-center justify-between px-6 transition-all duration-300",
        isCollapsed ? "left-16" : "left-60"
      )}
    >
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Blur Admin 2024</span>
        <div className="flex items-center gap-2">
          <a href="#" className="text-gray-400 hover:text-[#3b5998] transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#55acee] transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-800 transition-colors">
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="text-sm text-gray-500">
        Created with <span className="text-red-500">&#10084;</span>
      </div>
    </footer>
  );
}
