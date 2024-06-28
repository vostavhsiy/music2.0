import React from "react";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full p-10 pb-[150px] overflow-auto content">
      {children}
    </div>
  );
};

export default BrowseLayout;
