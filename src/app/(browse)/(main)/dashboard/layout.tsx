import React, { ReactNode } from "react";
import { DashboardSidebar } from "@/app/(browse)/(main)/dashboard/_components/DashboardSidebar";
import { currentUser } from "@/lib/services/auth.service";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const profile = await currentUser();

  if (!profile) redirect("/login");

  return (
    <div className="grid grid-cols-[3fr_1fr]">
      <div>{children}</div>
      <DashboardSidebar />
    </div>
  );
};

export default DashboardLayout;
