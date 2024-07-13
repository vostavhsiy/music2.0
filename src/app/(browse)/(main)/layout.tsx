import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Main } from "@/app/(browse)/_components/Main";
import { currentUser } from "@/lib/services/auth.service";
import { Player } from "@/components/Player/Player";

const BrowseLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await currentUser();

  return (
    <div className="grid grid-cols-[auto+1fr] text-primary h-screen overflow-hidden">
      <Sidebar profile={profile} />
      <Main profile={profile}>
        <div className="w-full p-10 pb-0">{children}</div>
      </Main>
      <Player />
    </div>
  );
};

export default BrowseLayout;
