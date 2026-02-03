"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Monitor,
  FileEdit,
  Grid3X3,
  BarChart3,
  Map,
  Layers,
  FileText,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/sidebar-context";
import { menuItems, MenuItem } from "@/lib/menu-items";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Monitor,
  FileEdit,
  Grid3X3,
  BarChart3,
  Map,
  Layers,
  FileText,
  MoreHorizontal,
};

function SidebarItem({ item, level = 0 }: { item: MenuItem; level?: number }) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);

  const hasSubMenu = item.subMenu && item.subMenu.length > 0;
  const isActive = item.path === pathname;
  const isParentActive = hasSubMenu && item.subMenu?.some((sub) => sub.path === pathname || sub.subMenu?.some((s) => s.path === pathname));

  const Icon = item.icon ? iconMap[item.icon] : null;

  const handleClick = () => {
    if (hasSubMenu) {
      setIsOpen(!isOpen);
    }
  };

  if (item.disabled) {
    return (
      <li className="opacity-50 cursor-not-allowed">
        <span
          className={cn(
            "flex items-center gap-3 px-4 py-2.5 text-gray-400",
            level > 0 && "pl-12"
          )}
        >
          {level === 0 && Icon && <Icon className="w-5 h-5" />}
          {!isCollapsed && <span>{item.title}</span>}
        </span>
      </li>
    );
  }

  return (
    <li>
      {item.path && !hasSubMenu ? (
        <Link
          href={item.path}
          className={cn(
            "flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors rounded-lg mx-2",
            isActive && "bg-[#209e91] text-white",
            level > 0 && "pl-12"
          )}
        >
          {level === 0 && Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
          {!isCollapsed && <span className="truncate">{item.title}</span>}
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className={cn(
            "flex items-center justify-between w-full gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors rounded-lg mx-2",
            (isOpen || isParentActive) && "text-white",
            level > 0 && "pl-12"
          )}
        >
          <div className="flex items-center gap-3">
            {level === 0 && Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
            {!isCollapsed && <span className="truncate">{item.title}</span>}
          </div>
          {!isCollapsed && hasSubMenu && (
            isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
          )}
        </button>
      )}

      {hasSubMenu && isOpen && !isCollapsed && (
        <ul className="mt-1">
          {item.subMenu?.map((subItem) => (
            <SidebarItem key={subItem.name} item={subItem} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Sidebar() {
  const { isCollapsed, isMobile } = useSidebar();

  if (isMobile && isCollapsed) {
    return null;
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-[#2d2d2d] z-40 transition-all duration-300 overflow-y-auto",
        isCollapsed ? "w-16" : "w-60"
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-2 text-white">
          <div className="w-8 h-8 bg-[#209e91] rounded-lg flex items-center justify-center font-bold">
            B
          </div>
          {!isCollapsed && (
            <span className="text-xl font-light">
              <span className="font-semibold">Blur</span>Admin
            </span>
          )}
        </Link>
      </div>

      <nav className="py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <SidebarItem key={item.name} item={item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
