import React, { ReactNode } from "react";
import { DashboardSidebar } from "@/app/(browse)/(main)/dashboard/_components/DashboardSidebar";
import { currentUser } from "@/lib/services/auth.service";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const profile = await currentUser();

  if (!profile) redirect("/login");

  return (
		<div className='grid grid-cols-[3fr_1fr] mb:max-lg:grid-cols-1 mb:max-lg:grid-rows-[3fr_1f] mb:max-lg:gap-8'>
			<div className='mb:max-lg:order-2'>{children}</div>
			<DashboardSidebar />
		</div>
	)
};

export default DashboardLayout;
