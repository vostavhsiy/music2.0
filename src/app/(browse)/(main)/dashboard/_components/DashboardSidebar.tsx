"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/dashboard",
    label: "Main",
  },
  {
    href: "/dashboard/audio",
    label: "Audio",
  },
  {
    href: "/dashboard/playlists",
    label: "Playlists",
  },
  {
    href: "/dashboard/follows",
    label: "Subscribes",
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col gap-8 p-3 rounded-xl bg-background">
      {links.map((link) => {
        return (
          <Link
            key={link.href}
            className={cn(
              "text-lg p-4 font-semibold rounded-lg",
              pathname === link.href &&
                "bg-gradient-to-r from-rose-400 to-red-500 text-white",
            )}
            href={link.href}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};
