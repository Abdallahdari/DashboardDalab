"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Package,
  X,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface SidebarProps {
  isMobileSidebarOpen: boolean;
  closeMobileSidebar: () => void;
}

export function Sidebar({}: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      title: "Product",
      href: "/dashboard/Product",

      icon: Package,
    },
    {
      title: "Add Products",
      href: "/dashboard/Productadd",
      icon: PlusCircle,
    },
    {
      title: "Blogs",
      href: "/dashboard/blog",
      icon: FileText,
    },
    {
      title: "Add Blog",
      href: "/dashboard/addblog",
      icon: PlusCircle,
    },
    {
      title: "Oders",
      href: "/dashboard/orders",
      icon: PlusCircle,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64   bg-background">
        <div className="p-4 ">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-gray-200 text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden transition-opacity"
        )}
      />

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r md:hidden transition-transform duration-300 ease-in-out"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <Button variant="ghost" size="icon">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
