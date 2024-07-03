"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/dashboard",
    label: "General",
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
    <div className="w-full flex flex-col items-center gap-8 p-3 rounded-xl bg-background">
      {links.map((link) => {
        return (
          <Link
            key={link.href}
            className={cn(
              "w-full text-center hover:underline text-lg p-4 font-semibold rounded-lg",
              pathname === link.href &&
                "bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white",
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
