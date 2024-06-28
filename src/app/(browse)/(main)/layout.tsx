import React from "react";
import { Sidebar } from "@/app/(browse)/(main)/_components/Sidebar";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      <div className="w-full p-10 pb-[150px] overflow-auto content">
        {children}
      </div>
    </>
  );
};

export default BrowseLayout;
